import Foundation
import PDFKit
import Vision
import CoreGraphics
import AppKit

struct OCRConfig {
    let inputPath: String
    let outputPath: String
}

enum OCRToolError: Error, LocalizedError {
    case invalidArguments
    case unreadableInput(String)
    case renderFailed(Int)

    var errorDescription: String? {
        switch self {
        case .invalidArguments:
            return "Usage: swift pdf_ocr_to_text.swift <input.pdf|image> <output.txt>"
        case .unreadableInput(let path):
            return "Could not open input at path: \(path)"
        case .renderFailed(let pageIndex):
            return "Failed to render page \(pageIndex + 1)"
        }
    }
}

func parseArguments() throws -> OCRConfig {
    let args = CommandLine.arguments
    guard args.count == 3 else {
        throw OCRToolError.invalidArguments
    }

    return OCRConfig(inputPath: args[1], outputPath: args[2])
}

func renderPage(_ page: PDFPage) -> CGImage? {
    let mediaBox = page.bounds(for: .mediaBox)
    let targetSize = CGSize(width: max(mediaBox.width * 3.0, 1800), height: max(mediaBox.height * 3.0, 1800))
    let image = page.thumbnail(of: targetSize, for: .mediaBox)
    var proposedRect = CGRect(origin: .zero, size: image.size)
    return image.cgImage(forProposedRect: &proposedRect, context: nil, hints: nil)
}

func renderImage(at path: String) -> CGImage? {
    guard let image = NSImage(contentsOfFile: path) else {
        return nil
    }
    var proposedRect = CGRect(origin: .zero, size: image.size)
    return image.cgImage(forProposedRect: &proposedRect, context: nil, hints: nil)
}

func recognizeText(from image: CGImage) throws -> String {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    request.recognitionLanguages = ["zh-Hans", "en-US"]

    let handler = VNImageRequestHandler(cgImage: image, options: [:])
    try handler.perform([request])

    let observations = (request.results ?? [])
        .sorted { lhs, rhs in
            if abs(lhs.boundingBox.midY - rhs.boundingBox.midY) < 0.02 {
                return lhs.boundingBox.minX < rhs.boundingBox.minX
            }
            return lhs.boundingBox.midY > rhs.boundingBox.midY
        }

    return observations
        .compactMap { $0.topCandidates(1).first?.string }
        .joined(separator: "\n")
}

func main() throws {
    let config = try parseArguments()
    let inputURL = URL(fileURLWithPath: config.inputPath)
    let ext = inputURL.pathExtension.lowercased()
    var pages: [String] = []

    if ext == "pdf" {
        guard let document = PDFDocument(url: inputURL) else {
            throw OCRToolError.unreadableInput(config.inputPath)
        }

        pages.reserveCapacity(document.pageCount)

        for pageIndex in 0..<document.pageCount {
            guard let page = document.page(at: pageIndex), let image = renderPage(page) else {
                throw OCRToolError.renderFailed(pageIndex)
            }

            let text = try recognizeText(from: image)
            let pageHeader = "Page \(pageIndex + 1)\n"
            pages.append(pageHeader + text.trimmingCharacters(in: .whitespacesAndNewlines))
        }
    } else {
        guard let image = renderImage(at: config.inputPath) else {
            throw OCRToolError.unreadableInput(config.inputPath)
        }
        let text = try recognizeText(from: image)
        pages.append(text.trimmingCharacters(in: .whitespacesAndNewlines))
    }

    let finalText = pages.joined(separator: "\n\n")
    try finalText.write(to: URL(fileURLWithPath: config.outputPath), atomically: true, encoding: .utf8)
}

do {
    try main()
} catch {
    let message = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}
