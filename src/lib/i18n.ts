// 国际化配置和翻译数据
export type Language = 'en' | 'zh';

export interface TranslationData {
  // 导航栏
  nav: {
    home: string;
    products: string;
    resources: string;
    about: string;
    contact: string;
    pricing: string;
    login: string;
  };
  
  // 主页标题和描述
  hero: {
    title: string;
    subtitle: string;
    description: string;
    getStarted: string;
    learnMore: string;
    trustedBy: string;
  };

  // 页面部分
  sections: {
    whatWeDo: {
      title: string;
      subtitle: string;
      scrollingText1: string;
      scrollingText2: string;
    };
    personas: {
      title: string;
      carbonExpert: {
        title: string;
        role: string;
        needs: string;
        stat: string;
        statDescription: string;
        secondStatDescription: string;
        thirdStatDescription: string;
        fourthStat: string;
        fourthStatDescription: string;
        painPoints: string[];
        testimonial: string;
        author: string;
        position: string;
      };
      brandOwner: {
        title: string;
        role: string;
        needs: string;
        stat: string;
        statDescription: string;
        secondStatDescription: string;
        thirdStatDescription: string;
        fourthStat: string;
        fourthStatDescription: string;
        painPoints: string[];
        testimonial: string;
        author: string;
        position: string;
      };
      supplyChain: {
        title: string;
        role: string;
        needs: string;
        stat: string;
        statDescription: string;
        secondStatDescription: string;
        thirdStatDescription: string;
        fourthStat: string;
        fourthStatDescription: string;
        painPoints: string[];
        testimonial: string;
        author: string;
        position: string;
      };
    };
    aiAssistants: {
      title: string;
      subtitle: string;
      comingSoon: string;
      getStarted: string;
      trustCenter: string;
      assistants: {
        carbonExpert: {
          [key: string]: {
            title: string;
            description: string;
          };
        };
        brandOwner: {
          [key: string]: {
            title: string;
            description: string;
          };
        };
        supplyChain: {
          [key: string]: {
            title: string;
            description: string;
          };
        };
      };
    };
    difference: {
      title: string;
      cards: {
        flexible: {
          title: string;
          description: string;
        };
        products: {
          title: string;
          description: string;
        };
        fastValue: {
          title: string;
          description: string;
        };
      };
    };
    scenarios: {
      title: string;
      whyNeed: {
        title: string;
        export: {
          title: string;
          description: string;
        };
        procurement: {
          title: string;
          description: string;
        };
        government: {
          title: string;
          description: string;
        };
      };
              scenarioCards: {
          marketAccess: {
            title: string;
            companyType: string;
            industries: string;
            coreDescription: string;
            detailDescription: string;
            miniCards: {
              cbam: {
                title: string;
                description: string;
              };
              batteryRelated: {
                title: string;
                description: string;
              };
              esprDpp: {
                title: string;
                description: string;
              };
              passiveVerification: {
                title: string;
                description: string;
              };
            };
          };
          supplyChain: {
            title: string;
            companyType: string;
            industries: string;
            coreConcept: string;
            detailDescription: string;
            miniCards: {
              sbti: {
                title: string;
                description: string;
              };
              biddingEntry: {
                title: string;
                description: string;
              };
              supplyChainPerformance: {
                title: string;
                description: string;
              };
              dataExchangeStandards: {
                title: string;
                description: string;
              };
            };
          };
          governmentProcurement: {
            title: string;
            companyType: string;
            industries: string;
            coreDescription: string;
            detailDescription: string;
            miniCards: {
              governmentBuyClean: {
                title: string;
                description: string;
              };
              greenBuilding: {
                title: string;
                description: string;
              };
              industryRequirements: {
                title: string;
                description: string;
              };
            };
          };
        };
      painPoints: {
        title: string;
        highBarrier: {
          title: string;
          description: string;
        };
        highCost: {
          title: string;
          description: string;
        };
        longCycle: {
          title: string;
          description: string;
        };
        supplyChainPressure: {
          title: string;
          description: string;
        };
        hiddenCost: {
          title: string;
          description: string;
        };
      };
      painSection: {
        title: string;
        solutionTitle: string;
        cards: {
          costHigh: {
            title: string;
            description: string;
          };
          cycleLong: {
            title: string;
            description: string;
          };
          barrierHigh: {
            title: string;
            description: string;
          };
          supplyChainPressure: {
            title: string;
            description: string;
          };
          hiddenCost: {
            title: string;
            description: string;
          };
          rework: {
            title: string;
            description: string;
          };
        };
        solution: {
          costReduction: {
            title: string;
            description: string;
          };
          zeroBarrier: {
            title: string;
            description: string;
          };
          preValidation: {
            title: string;
            description: string;
          };
        };
      };
      ourSolution: {
        title: string;
        zeroBarrier: {
          title: string;
          description: string;
        };
        lowCost: {
          title: string;
          description: string;
        };
        preValidation: {
          title: string;
          description: string;
        };
      };
    };
    comparison: {
      title: string;
      subtitle: string;
    };
    valueForUser: {
      title: string;
      subtitle: string;
    };
    aboutUs: {
      title: string;
      subtitle1: string;
      subtitle2: string;
      subtitle3: string;
      highlightText: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      plans: {
        free: {
          title: string;
          description: string;
          price: string;
          features: string[];
          button: string;
        };
        standard: {
          title: string;
          description: string;
          price: string;
          features: string[];
          button: string;
        };
        enterprise: {
          title: string;
          description: string;
          price: string;
          features: string[];
          button: string;
        };
      };
    };
    value: {
      cards: {
        cost: {
          title: string;
          subtitle: string;
          description: string;
        };
        time: {
          title: string;
          subtitle: string;
          description: string;
        };
        barrier: {
          title: string;
          subtitle: string;
          description: string;
        };
        trusted: {
          title: string;
          subtitle: string;
          description: string;
        };
      };
    };
    moreInfo: string;
  };
  
  // 功能特性卡片
  features: {
    card1: {
      title: string;
      description: string;
      detail: string;
    };
    card2: {
      title: string;
      description: string;
      detail: string;
    };
    card3: {
      title: string;
      description: string;
      detail: string;
    };
    card4: {
      title: string;
      description: string;
      detail: string;
    };
    card5: {
      title: string;
      description: string;
      detail: string;
    };
  };
  
  // 对比部分
  comparison: {
    title: string;
    subtitle: string;
    aiAgent: {
      title: string;
      steps: string;
      stepList: string[];
    };
    consultant: {
      title: string;
      steps: string;
      stepList: string[];
    };
    traditional: {
      title: string;
      steps: string;
      stepList: string[];
    };
  };
  
  // 联系表单
  contact: {
    title: string;
    subtitle: string;
    description: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      industry: string;
      message: string;
      submit: string;
      submitting: string;
      privacyDisclaimer: string;
      placeholder: {
        name: string;
        email: string;
        phone: string;
        company: string;
        industry: string;
        message: string;
      };
      industries: {
        automotive: string;
        electronics: string;
        textiles: string;
        chemicals: string;
        foodBeverage: string;
        construction: string;
        metals: string;
        plastics: string;
        packaging: string;
        pharmaceuticals: string;
        energy: string;
        manufacturing: string;
        furniture: string;
        cosmetics: string;
        toys: string;
        agriculture: string;
        transportation: string;
        retail: string;
        other: string;
      };
    };
    messages: {
      success: string;
      error: string;
      validation: string;
    };
  };
  
  // 页脚
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    copyright: string;
    privacyPolicy: string;
  };
  
  // 其他页面
  pages: {
    about: {
      title: string;
      content: string;
    };
    products: {
      title: string;
      content: string;
    };
    pricing: {
      title: string;
      content: string;
    };
  };

  // 隐私政策
  privacy: {
    title: string;
    subtitle: string;
    backToHome: string;
    lastUpdated: string;
    updateDate: string;
    sections: {
      introduction: {
        title: string;
        content: string;
      };
      dataCollection: {
        title: string;
        personalInfo: string;
        items: {
          name: string;
          email: string;
          company: string;
          usage: string;
        };
      };
      dataUsage: {
        title: string;
        items: {
          service: string;
          communication: string;
          improvement: string;
          legal: string;
        };
      };
      dataSharing: {
        title: string;
        content: string;
      };
      security: {
        title: string;
        content: string;
      };
      rights: {
        title: string;
        intro: string;
        items: {
          access: string;
          correct: string;
          delete: string;
          portability: string;
        };
      };
      contact: {
        title: string;
        content: string;
      };
    };
  };

  // FAQ 页面
  faq: {
    title: string;
    seo: {
      title: string;
      description: string;
      indexable: boolean;
    };
    groups: Array<{
      name: string;
      items: Array<{
        q: string;
        a: string[];
      }>;
    }>;
  };
}

// 英文翻译
export const translations: Record<Language, TranslationData> = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      pricing: 'Pricing',
      login: 'login'
    },
    hero: {
      title: 'AI Agent for Product Carbon Footprint Accounting & Assurance',
      subtitle: 'Generate audit-ready Product Carbon Footprints (PCFs) in days, not months. Cut costs and complexity with Climate Seal\'s AI agent.',
      description: 'Zero Expertise Required - Guided workflows and automated data processing make complex accounting accessible to anyone.\nSlash Time & Cost - Achieve in days what traditionally takes months, at a fraction of the cost.\nAudit-Ready Guarantee - Generate reports that adhere to all major frameworks & regulations, including GHG Protocol, ISO 14067, and CBAM.',
      getStarted: 'Book a Demo with First Report Free',
      learnMore: 'Learn More',
      trustedBy: 'Trusted by'
    },

    sections: {
      whatWeDo: {
        title: 'What tech solution we are offering？',
        subtitle: 'Get a credible carbon footprint at 1% of the cost and time',
        scrollingText1: 'Gain Credibility At Low Cost',
        scrollingText2: 'Use Credit At Low Cost'
      },
      personas: {
        title: 'Designed for Every Team',
        carbonExpert: {
          title: 'Carbon/ESG Professionals',
          role: 'ESG/Sustainability/Carbon/Consulting Expert',
          needs: 'I need automated, intelligent tools to improve work efficiency and report accuracy',
          stat: '1-Minute LCA & 95% Accuracy',
          statDescription: 'Slash Waiting Time & Ensure Confidence',
          secondStatDescription: 'Auto Batch Factor Matching',
          thirdStatDescription: 'Ensure Auditable & Comparable Data',
          fourthStat: 'DQR+ Industry Data & Field Validation',
          fourthStatDescription: 'Accelerating the entire compliance process.',
          painPoints: [
            'Rules and factors don\'t match — results fluctuate ±10-20%',
            'Most data delayed or incorrect — on-time rate below 50%, cleanup work takes enormous time',
            'Each SKU takes days; most time spent on factor matching',
            'Lack of process or data assessment — risks hard to discover',
            'Evidence scattered; external checks slow and expensive, rework constantly delays delivery'
          ],
          testimonial: '"Climate Seal isn\'t just another calculation tool, but an intelligent operating system that supports our need for precision and efficiency at scale."',
          author: 'Dr. Sarah Chen',
          position: 'Senior ESG Consultant, EcoStrategy'
        },
        brandOwner: {
          title: 'Brands & Procurement Leaders',
          role: 'Sustainability Leader',
          needs: 'I need to achieve brand and supply chain carbon reduction goals, reduce supply chain carbon management costs and pressure, enabling painless high-quality carbon emission data from supply chain',
          stat: '≈$100 / 4 Hours per SKU',
          statDescription: 'Slash Compliance Cost & Time',
          secondStatDescription: 'Built-in Data Quality Gates',
          thirdStatDescription: 'Ensure Consistent & Comparable Data',
          fourthStat: 'A Streamlined Process for Suppliers',
          fourthStatDescription: 'Rigorous Decarbonization & Sourcing',
          painPoints: [
            'Supply-chain companies lack specialized expertise, making compliance costly and burdensome',
            'Endless chasing supply chain data; on-time deliveries only 40-70%',
            'Poor data quality skews decarbonisation priorities',
            'No clear ROI and MACC, decarbonization projects fail to get green‑lit, stalling SBTi and CSRD milestones.'
          ],
          testimonial: '"Climate Seal transformed our supply chain carbon management from a compliance burden into a competitive advantage."',
          author: 'Michael Rodriguez',
          position: 'Chief Sustainability Officer, GreenTech Corp'
        },
        supplyChain: {
          title: 'Suppliers & Exporters',
          role: 'Export Enterprise Compliance Manager',
          needs: 'I need low-cost, high-efficiency solutions to provide credible carbon footprint reports to importers and downstream customers, ensuring sales are not affected',
          stat: '3 Files & One Simple Workflow.',
          statDescription: 'Reduce Compliance Cost Significantly',
          secondStatDescription: 'Auto-Matching & Built-in Validation',
          thirdStatDescription: '90%+ Pass on First Submission',
          fourthStat: '4-Hour, Audit-Ready PCF',
          fourthStatDescription: 'Meet requirements effortlessly',
          painPoints: [
            'PCF reports take 4-8 weeks, missing RFQ / tender deadlines',
            'Rework cycles delay shipments and risk customs holds',
            'No in-house carbon expertise, third-party consulting is expensive, and mainstream carbon tools are pricey and hard to use'
          ],
          testimonial: '"With Climate Seal, we can now provide world-class carbon footprint reports at a fraction of the cost and time."',
          author: 'Li Wei',
          position: 'Compliance Director, Global Manufacturing Ltd'
        }
      },
      aiAssistants: {
        title: 'Meet Your AI Carbon Expert And Assistants',
        subtitle: 'Choose your role. Your AI carbon experts and assistants are ready to support you 24/7.',
        comingSoon: 'Coming soon',
        getStarted: 'Book a Demo with First Report Free',
        trustCenter: 'Visit our resource session',
        assistants: {
          carbonExpert: {
            carbonCalculator: {
              title: 'Regulations Navigator',
              description: 'Auto-map your business to the right standards and lock the rule set so you clear compliance faster and accurately.'
            },
            complianceTracker: {
              title: 'Data Intake Orchestrator', 
              description: 'Auto-standardize and parse BOM and other complex data, so data arrives on time and usable—no manual cleaning or cross-checking.'
            },
            climateSeal: {
              title: 'PCF Modeler & Factor Matcher',
              description: 'Batch-match factors and compute PCF from BOM/energy/logistics—shift from line-by-line factor hunting to bulk output, freeing your expert time.'
            },
            supplyChainAnalyzer: {
              title: 'Risk & Quality Sentinel',
              description: 'Field-level quality and risk checks, uncertainty bands, and fix hints—pass verification first time with fewer reworks and more credible conclusions.'
            },
            reportGenerator: {
              title: 'External Cross-Check Verifier',
              description: 'Cross-verifies reported values against third-party reports and public datasets, returns confidence-rated matches with evidence links in minutes, and flags conflicts for rapid resolution.'
            },
            dataValidator: {
              title: 'Risk Screener',
              description: 'Scores regulatory/disclosure/supply-chain/reputation risk, ranks the top 10 exposures, and produces a 90-day remediation plan with marginal abatement costs (USD/tCO₂e) and ROI.'
            }
          },
          brandOwner: {
            brandAnalyzer: {
              title: 'Supplier Intake & Dispatch',
              description: 'Push tasks and AI tools across your entire supply chain—suppliers run zero-friction AI calculations at no additional cost, reducing supplier burden.'
            },
            scopeTracker: {
              title: 'Supplier Risk & Scoring',
              description: 'Score both the calculation process and the results, flag risks, and see at a glance whether supplier-submitted emissions meet your quality standards.'
            },
            sustainabilityReporter: {
              title: 'Milestone Tracker',
              description: 'Auto-chase data collection against plan to secure accurate, on-time data, so decarbonization and compliance timelines stay on track.'
            },
            goalManager: {
              title: 'Abatement & SBTi Planner',
              description: 'Turn supplier data into rigorous abatement/SBTi plans—ROI-backed and clearly prioritized—so approvals move faster.'
            }
          },
          supplyChain: {
            supplierAssessment: {
              title: 'PCF Builder',
              description: 'Drop your BOM, product specs, and utility data to generate a credible PCF, so you don’t miss RFQ/tender or export deadlines.'
            },
            exportCompliance: {
              title: 'Quality & Risk Reviewer',
              description: 'Rigorous emissions calculation with process quality scoring and verification-risk assessment, reducing rejections and holds for steadier shipments.'
            },
            costOptimizer: {
              title: 'Evidence Pack & Submission',
              description: 'Auto-pack data and evidence into buyer/assurance formats—one-click submission, fewer errors, saving time and translation cost.'
            },
            marketAnalyzer: {
              title: 'Market Analyzer',
              description: 'Analyzes market trends and\ncarbon requirements, proactively.'
            }
          }
        }
      },
      difference: {
        title: 'The Climate Seal Difference',
        cards: {
          flexible: {
            title: 'Faster',
            description: 'Auto-map rules & factors → batch PCF modeling from BOM/energy/logistics → one-click buyer/customs reports.'
          },
          products: {
            title: 'Credible', 
            description: 'Field-level 0-100 quality score, auto-fix hints, uncertainty bands; external cross-checks & evidence packs with minute-level confidence.'
          },
          fastValue: {
            title: 'Frictionless',
            description: 'A low-friction, low-cost pipeline for verification-grade supplier data—plug-and-play for SBTi and abatement planning.'
          }
        }
      },
      scenarios: {
        title: 'Scenarios you need carbon footprint',
        whyNeed: {
          title: 'Why Do You Need Product Carbon Footprint (PCF)?',
          export: {
            title: 'Export',
            description: 'CBAM default values are costly\nESPR/DPP: Multiple categories require "product passports"\nDisclosure: Rough disclosure faces passive verification (satellite)\nBattery-related: "Product-level carbon footprint + electronic passport"'
          },
          procurement: {
            title: 'Procurement/Green Supply Chain',
            description: 'Brands: SBTi requires 67% Scope 3 coverage\nBrands: Carbon performance written into supplier terms\nSupply chain pressure: High data quality requirements, high costs, poor carbon foundation'
          },
          government: {
            title: 'Government Green Procurement & Green Building EPD',
            description: 'Government green procurement: Cannot participate without PCF/LCA\nEngineering/Building materials: Cannot bid or lose points without EPD'
          }
        },
        scenarioCards: {
          marketAccess: {
            title: 'Market Access & Cross-Border Compliance',
            companyType: 'Export-oriented enterprises',
            industries: 'Steel, aluminum, cement, fertilizer, batteries, textiles, furniture, tires, hydrogen',
            coreDescription: 'Entry barriers, compliance costs; policy review risks;',
            detailDescription: 'A product carbon footprint report and data package that can be accepted by customs and customers can reduce compliance costs, compliance risks, improve competitiveness/listing speed, and avoid returns and fines.',
            miniCards: {
              cbam: {
                title: 'CBAM',
                description: 'High cost using default values<br/>Fines for misreporting and omissions'
              },
              batteryRelated: {
                title: 'Battery Related',
                description: 'Battery upstream and downstream require "product-level carbon<br/>footprint + digital passport"'
              },
              esprDpp: {
                title: 'ESPR/DPP',
                description: 'Multi-category European sales require "digital<br/>product passport"'
              },
              passiveVerification: {
                title: 'Passive Verification',
                description: 'Extensive leakage subject to passive satellite verification/fines (EUDR)'
              }
            }
          },
          supplyChain: {
            title: 'Supply Chain & Major Brand Procurement',
            companyType: 'Brands and supply chains',
            industries: 'Automotive, chemicals & materials, electronics, fuels, steel & aluminum commodities, medical devices;',
            coreConcept: 'Bidding entry; customer priority;',
            detailDescription: 'A PCF product carbon footprint report + traceable/exchangeable data package that can be accepted by customers becomes an RFI/RFQ entry ticket, which can meet national-level, enterprise-level, and low-carbon absolute letter requirements, improving supply chain carbon competitiveness and reducing carbon compliance costs.',
            miniCards: {
              sbti: {
                title: 'SBTi',
                description: 'SBTi requires brands to cover<br/>67% Scope 3'
              },
              biddingEntry: {
                title: 'Bidding Entry',
                description: 'Suppliers lack compliance with bidding requirements<br/>Supplier terms (highly mandatory)'
              },
              supplyChainPerformance: {
                title: 'Supply Chain Carbon Performance',
                description: 'Brands have high data quality requirements<br/>High supply chain carbon compliance costs<br/>Poor carbon foundation<br/>Poor data quality'
              },
              dataExchangeStandards: {
                title: 'Data Exchange Standards',
                description: 'Submit carbon data according to industry standards<br/>Automotive Catena-X<br/>Chemical TfS<br/>Cross-industry: WBCSD PACT'
              }
            }
          },
          governmentProcurement: {
            title: 'Government Procurement & Industry Requirements',
            companyType: 'Engineering enterprises and specific industries',
            industries: 'Construction, engineering, healthcare, electronics ICT, furniture office, photovoltaic, logistics;',
            coreDescription: 'Government buy clean bidding entry; green pricing; sales revenue;',
            detailDescription: 'A PCF/EPD product carbon footprint report + data package that can be accepted by the government becomes a key resource for government green procurement or industry procurement. Public and institutional procurement can be scored, and without compliance, there is no opportunity to participate in bidding.',
            miniCards: {
              governmentBuyClean: {
                title: 'Government Buy Clean',
                description: 'Mandatory submission of Type III EPD<br/>Set GWP thresholds/priorities'
              },
              greenBuilding: {
                title: 'Green Building',
                description: 'Green building product EPD;<br/>EU/US applications/European references in bid documents,<br/>as bidding thresholds'
              },
              industryRequirements: {
                title: 'Industry Requirements',
                description: 'ICT hardware = EPEAT climate standards<br/>Aviation fuel = SAF<br/>Healthcare & Life Sciences = UK NHS<br/>Furniture & Office = BIFMA LEVEL<br/>Fashion/Textiles = French AGEC/ESPR/DPP'
              }
            }
          }
        },
        painPoints: {
          title: 'Pain Points in Completing Product Carbon Footprint (PCF)',
          highBarrier: {
            title: 'High Barrier',
            description: 'Requires carbon experts who understand both methodology and delivery\nMany carbon regulations and standards'
          },
          highCost: {
            title: 'High Cost',
            description: 'PCF or LCA reports require tens of thousands of dollars'
          },
          longCycle: {
            title: 'Long Cycle',
            description: 'PCF takes 1-3 months / EPD takes 3-6 months'
          },
          supplyChainPressure: {
            title: 'High Supply Chain Pressure',
            description: 'Supply chain companies have poor carbon foundation, poor data quality, high costs\nBrands have high carbon management costs'
          },
          hiddenCost: {
            title: 'Hidden Costs',
            description: 'CBAM default values are costly\nPCF missing items rejected by verification agencies for rework'
          }
        },
        painSection: {
          title: 'We Understand Your Carbon Footprint Pain',
          solutionTitle: 'Climate Seal Hopes to Change All This',
          cards: {
            costHigh: {
              title: 'High Cost',
              description: 'Complete LCA/EPD requires<br/>thousands to tens of thousands of dollars<br/><br/>'
            },
            cycleLong: {
              title: 'Long Cycle',
              description: 'PCF 1-3 months<br/>EPD 3-6 months<br/>Easy to exceed deadlines and unreliable'
            },
            barrierHigh: {
              title: 'High Barrier',
              description: 'Multiple standards and regulations<br/>Regulations update rapidly<br/>Requires experts who understand methodology + delivery'
            },
            supplyChainPressure: {
              title: 'High Supply Chain Pressure',
              description: 'Brand supply chain management pressure (covers 67% Scope 3)<br/>Suppliers have poor carbon foundation (high outsourcing costs)<br/>Poor supplier data quality/credibility'
            },
            hiddenCost: {
              title: 'Hidden Costs',
              description: '(CBAM)<br/>Using default values is costly<br/>Easy to miss reports and errors - fines<br/>Yearly increases require budget assessment'
            },
            rework: {
              title: 'Repeated Rework',
              description: 'Data caliber deviates from verification agencies<br/>Data gaps or inconsistent calibers<br/>Repeated rejections and revisions'
            }
          },
          solution: {
            costReduction: {
              title: '↓99%',
              description: 'Cost (hundred-dollar level)<br/>Cycle (hour level)'
            },
            zeroBarrier: {
              title: 'Zero Barrier',
              description: 'Expert-level carbon consultant guidance<br/>No professional background required'
            },
            preValidation: {
              title: 'Pre-validation',
              description: 'Expert-level pre-validation<br/>Reject rework & hidden costs'
            }
          }
        },
        ourSolution: {
          title: 'What we are offering?\nOur Solution',
          zeroBarrier: {
            title: 'Zero Barrier',
            description: 'Expert-level guidance\nNo professional background required'
          },
          lowCost: {
            title: 'Cost (Hundreds) / Cycle (Hours)',
            description: '99% reduction'
          },
          preValidation: {
            title: 'Expert "Pre-validation"',
            description: 'Reject rework & hidden costs'
          }
        }
      },
      comparison: {
        title: 'Compare With Traditional Way',
        subtitle: 'Why Choose Climate Seal AI?'
      },
      valueForUser: {
        title: 'Value for Teams and the Business',
        subtitle: 'Choose the right plan to start your carbon footprint journey'
      },
      aboutUs: {
        title: 'About Us',
        subtitle1: 'Gain Credibility At Low Cost',
        subtitle2: 'Use Credit At Low Cost',
        subtitle3: 'Leave More Time And Budget To',
        highlightText: 'Decarbonization'
      },
      pricing: {
        title: 'Pricing Plans',
        subtitle: 'Choose the right plan to start your carbon footprint journey',
        plans: {
          free: {
            title: 'Self-Service',
            description: 'Use the AI Agent independently to generate reports',
            price: '$98',
            features: ['200 BOM lines emission factor matching (equivalent to PCF 2-4 reports)', 'Guided by Climate Seal AI agent from start-to-finish', 'Generate an audit-ready report within 4 hours'],
            button: 'Contact Sales'
          },
          standard: {
            title: 'Done-For-You',
            description: 'You provide the data, and we handle the rest',
            price: '$300',
            features: ['Simply provide 3 files (product description; BOM file; energy consumption data)', 'We deliver an audit-ready report in 48 hours'],
            button: 'Contact Sales'
          },
          enterprise: {
            title: 'Enterprise',
            description: 'Custom solutions for large organizations',
            price: 'Custom',
            features: ['Supply chain mgmt (standard component in all enterprise account)', 'ERP/CRM integration'],
            button: 'Contact Sales'
          }
        }
      },
      value: {
        cards: {
          cost: {
            title: 'Reduce reporting cost to ~1%',
            subtitle: 'Cost reduce',
            description: 'For finance and sustainability teams: less than $70 per credible report'
          },
          time: {
            title: 'From months to hours',
            subtitle: 'Time saving',
            description: 'For operations teams: move from multi‑month cycles to hours'
          },
          barrier: {
            title: 'Zero expertise required',
            subtitle: 'Zero barrier',
            description: 'For any role: guided flows produce credible, consistent results'
          },
          trusted: {
            title: 'Verification‑grade credibility',
            subtitle: 'Audit-ready',
            description: 'For compliance & buyers: auditable outputs with evidence'
          }
        }
      },
      moreInfo: 'Get More Information'
    },
    features: {
      card1: {
        title: 'Auto Regulation Match & LCA Build',
        description: 'In just 30 seconds, simply enter the product name and sales region, and the system will build the compliance boundary and base model according to regulations such as the latest EU Battery Directive or ISO 14067.',
        detail: '**Value:** This helps users reduce regulatory research by 90%, enabling rapid understanding and matching of regulations across different sales regions.'
      },
      card2: {
        title: 'BOM Parsing in Seconds',
        description: 'Simply provide BOM information or a BOM file, and the system will instantly extract hierarchical structure, quantity, and material information without requiring line-by-line entry.',
        detail: '**Value:** Assemblies with thousands of parts can be calculated in minutes, allowing engineering, finance, and carbon emission teams to work from the same structured spreadsheet.'
      },
      card3: {
        title: 'Intelligent Emission Factor Matching',
        description: 'The engine matches BOM lines, energy, and logistics data in real time, and compares it with ecoinvent and other databases to return highly accurate factors and factor sources.',
        detail: '**Value:** This reduces manual research time from weeks to minutes, while providing fully traceable, accurate factor data for immediate approval by audits or customer spot checks.'
      },
      card4: {
        title: 'Quality & Risk Analytics',
        description: 'One-click creation of data quality radars, ±95% Monte Carlo bands, and heatmaps highlighting high-impact and low-quality items. The overall confidence score is then aggregated to avoid rejections and rework by verification agencies.',
        detail: '**Value:** This module helps users gain insight into the largest emission hotspots, sources of uncertainty, and data quality risks, providing users and auditors with quantifiable risk assessments based on the Confidence Indicator (CI).'
      },
      card5: {
        title: 'End-to-End Customization',
        description: 'The supply chain module invites second- and third-tier suppliers in batches, calculates their carbon footprints without any barriers, and performs pre-verification and assessment of the results to ensure their credibility. Data can be automatically synchronized with ERP/SRM suites. This module helps users obtain high-quality carbon emissions data and package it into carbon assets for low-cost green loan applications.',
        detail: '**Value:** Suppliers can save 99% of time and costs. Through the intelligent advisor, they can easily complete audit-level reports and submit them to brands. Brands can receive highly trusted results and reduce their supply chain carbon management costs by over 90%. Credit-approved data can be monetized as carbon assets or collateral for green loans, unlocking the value of carbon reduction efforts early.'
      }
    },
    comparison: {
      title: 'Why Choose Climate Seal AI?',
      subtitle: 'Compare traditional approaches with our AI-powered solution',
      aiAgent: {
        title: 'AI Agent',
        steps: '4\nSTEPS',
        stepList: ['① Minimal Data', '② Confirm', '③ Send to Verifier', '④ Certification']
      },
      consultant: {
        title: 'Third Party Carbon Consultant + Carbon Accounting Software',
        steps: '11\nSTEPS',
        stepList: ['① Training', '② Doc + Reg Map', '③ Data Checklist', '④ Data Clean', '⑤ Gap Fill', '⑥ Build Model', '⑦ Factor Match', '⑧ Submit', '⑨ Issue List', '⑩ Corrections', '⑪ Certification']
      },
      traditional: {
        title: 'Third Party Carbon Consultant',
        steps: '12\nSTEPS',
        stepList: ['① Kick-Off', '② Info Search', '③ Data Prep', '④ Clean + Interview', '⑤ Calc Model', '⑥ Factor Calc', '⑦ Draft Report', '⑧ Review', '⑨ Submit to Verifier', '⑩ Issue Feedback', '⑪ Info Correction', '⑫ Certification']
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get your first audit-ready report. Schedule a call with our team to discover how simple carbon accounting can be.',
      description: 'Get in touch with our team',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company Name',
        industry: 'Industry',
        message: 'Message',
        submit: 'Send Message',
        submitting: 'Sending...',
        privacyDisclaimer: '*I disclose my information to Climate Seal. I have read and agree to Climate Seal\'s Privacy Policy',
        placeholder: {
          name: 'Please enter your name',
          email: 'Please enter your email',
          phone: 'Please enter your phone number',
          company: 'Please enter company name',
          industry: 'Please select your industry',
          message: 'Please describe your needs or questions'
        },
        industries: {
          automotive: 'Automotive Manufacturing',
          electronics: 'Electronics & Electrical',
          textiles: 'Textiles & Apparel',
          chemicals: 'Chemicals & Chemical Engineering',
          foodBeverage: 'Food & Beverage',
          construction: 'Construction & Building Materials',
          metals: 'Steel & Metals',
          plastics: 'Plastics & Rubber',
          packaging: 'Packaging & Printing',
          pharmaceuticals: 'Pharmaceuticals & Medical',
          energy: 'Energy & Power',
          manufacturing: 'Mechanical Manufacturing',
          furniture: 'Furniture & Home',
          cosmetics: 'Cosmetics & Personal Care',
          toys: 'Toys & Consumer Goods',
          agriculture: 'Agriculture & Food',
          transportation: 'Transportation & Logistics',
          retail: 'Retail & Trade',
          other: 'Other'
        }
      },
      messages: {
        success: 'Message sent successfully! We will reply to you soon.',
        error: 'Send failed, please try again later or send email directly to xuguang.ma@climateseal.net',
        validation: 'Please fill in all required fields'
      }
    },
    footer: {
      description: 'AI-powered carbon accounting platform for sustainable business solutions.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Climate Seal. All rights reserved.',
      privacyPolicy: 'Privacy Policy'
    },
    pages: {
      about: {
        title: 'About Climate Seal',
        content: 'About page content is under construction...'
      },
      products: {
        title: 'Our Products',
        content: 'Products page content is under construction...'
      },
      pricing: {
        title: 'Pricing Plans',
        content: 'Pricing page content is under construction...'
      }
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us',
      backToHome: 'Back to Home',
      lastUpdated: 'Last Updated',
      updateDate: 'December 2024',
      sections: {
        introduction: {
          title: '1. Introduction',
          content: 'Climate Seal ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our carbon footprint services.'
        },
        dataCollection: {
          title: '2. Information We Collect',
          personalInfo: 'Personal Information',
          items: {
            name: 'Name and contact information',
            email: 'Email address',
            company: 'Company information',
            usage: 'Usage data and analytics'
          }
        },
        dataUsage: {
          title: '3. How We Use Your Information',
          items: {
            service: 'To provide and maintain our services',
            communication: 'To communicate with you about our services',
            improvement: 'To improve our website and services',
            legal: 'To comply with legal obligations'
          }
        },
        dataSharing: {
          title: '4. Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.'
        },
        security: {
          title: '5. Data Security',
          content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        rights: {
          title: '6. Your Rights',
          intro: 'You have the right to:',
          items: {
            access: 'Access your personal information',
            correct: 'Correct inaccurate information',
            delete: 'Request deletion of your information',
            portability: 'Data portability'
          }
        },
        contact: {
          title: '7. Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us at:'
        }
      }
    }
    ,
    faq: {
      title: 'Frequently Asked Questions',
      seo: {
        title: 'FAQ | Climate Seal',
        description: 'Common questions about product, features, pricing, and support.',
        indexable: true,
      },
      groups: [
        {
          name: 'Product',
          items: [
            {
              q: 'What are some common use cases?',
              a: [
                'Brand tenders require suppliers to provide PCF documentation; exporting goods to other countries or regions necessitates disclosure of PCF. Scenarios such as carbon taxes, batteries, and DPP (Digital Product Passport) also rely on PCF as foundational support.'
              ]
            },
            {
              q: 'What does Climate Seal do? How is it different from traditional consulting?',
              a: [
                'An AI-integrated platform for product carbon footprint (PCF) calculation and compliance delivery. It automates BOM cleansing, factor matching, computation, risk assessment, and audit evidence packaging. Results are delivered in hours—compared to weeks or months for consulting projects—while reducing costs by over 90%.'
              ]
            },
            {
              q: 'What data is required to get started? Is it difficult?',
              a: [
                'Three minimum inputs are sufficient: product specifications/BOM/energy consumption/logistics. Missing items can be temporarily filled with industry defaults or similar processes, with assumptions and uncertainties clearly labeled. The system provides wizard-style templates, unit validation, and auto-completion. When data is incomplete, it guides users to data owners and helps them understand formats and requirements for low-barrier data acquisition.'
              ]
            },
            {
              q: 'How quickly can the first result be obtained? What factors affect accuracy?',
              a: [
                'From importing the three inputs to generating results takes approximately 1–2 hours; including risk assessment and corrections, the total time is about 2–4 hours. For supply chain carbon management, the timeline depends on supplier count and product complexity. We first cover the top 80% of emission contributors, then iterate on the long tail. Accuracy primarily depends on the completeness of BOM and energy consumption data, and the clarity of understanding of your operations.'
              ]
            },
            {
              q: 'How to account for Scope 3 Category 1 (purchased goods and services)?',
              a: [
                'Follow the route: supplier-specific preference → hybrid method → average factor → expenditure-based (EEIO) as fallback; use a cradle-to-gate boundary; clearly delineate Categories 2/4/5 to prevent double counting; assign DQR and uncertainty to each procurement line, allowing recalculation when better data becomes available.'
              ]
            },
            {
              q: 'Are the results reliable? Can they be audited/verified?',
              a: [
                'Aligned with ISO 14067, featuring built-in DQR scoring, risk analysis, uncertainty assessment, and data lineage. One-click export of audit packages supports third-party verification (SGS/BSI/TÜV, etc.).'
              ]
            },
            {
              q: 'Can BOMs be imported in bulk and automatically matched to factors?',
              a: [
                'Supports Excel/CSV batch import (handles BOMs with hundreds of rows). The system performs multi-level parsing, unit normalization, and specification extraction, using rules and AI for bulk factor matching (with configurable confidence thresholds and manual review queues).'
              ]
            },
            {
              q: 'What are the deliverables and formats? Can they meet CBAM/PEF/EPD/DPP requirements?',
              a: [
                'Outputs include PDF reports, machine-readable formats (CSV/JSON), and audit packages; can generate user-specified data formats and provide QR codes for easy display and reuse.'
              ]
            },
            {
              q: 'What if suppliers are uncooperative or data is incomplete?',
              a: [
                'Provide a lightweight supplier portal and AI advisor that supports invitations, task assignments, and automatic reminders. The AI advisor enables low-barrier data completion without brand-side training, constrains and validates data quality, and triggers recalculation once backfilled data meets quality standards. The entire process is traceable for auditing.'
              ]
            },
            {
              q: 'Who owns my data? Is it secure?',
              a: [
                'Data and results belong to the client. Climate Seal does not retain users’ raw data but provides operational logs for traceability. Data residency, export, and deletion can be enabled as needed; on‑premises deployment is also supported for data security.'
              ]
            }
          ]
        },
        {
          name: 'Pricing',
          items: [
            {
              q: 'How are pricing and trials arranged?',
              a: [
                'We offer one free trial report. The full version is billed based on calculation credits. The goal is to reduce the time and cost of a single PCF run to 1% of traditional methods.'
              ]
            }
          ]
        },
        {
          name: 'Others',
          items: [
            {
              q: 'What is the difference between “Product Carbon Footprint (PCF)” and “Corporate Carbon Accounting (Scope 1/2/3)”?',
              a: [
                'PCF measures greenhouse gas emissions across the entire life cycle of a single product, focusing on the product itself (raw materials/semi-finished/finished goods). Corporate carbon accounting, following the GHG Protocol, categorizes emissions into Scope 1/2/3 at the organizational level, focusing on overall corporate emissions (total energy consumption, employee activities, etc.).'
              ]
            }
          ]
        }
      ]
    }
  },
  
  // 中文翻译
  zh: {
    nav: {
      home: '首页',
      products: '产品',
      resources: '资源中心',
      about: '关于我们',
      contact: '联系我们',
      pricing: '价格',
      login: '登录'
    },
    hero: {
      title: 'AI智能体：产品碳足迹核算与保障（Accounting & Assurance）',
      subtitle: '在数天内生成核验级的产品碳足迹（PCF）成果，而非数月。借助 Climate Seal 的 AI 智能体，显著降低成本与复杂度。',
      description: '零门槛上手——引导式流程与自动化数据处理，让任何角色都能完成专业核算。\n时间与成本减半——以天为单位完成传统需数月的工作，成本仅为其一小部分。\n核验就绪保证——遵循 GHG Protocol、ISO 14067、CBAM 等主流框架与法规，生成可核验的合规成果。',
      getStarted: '预约演示，首份报告免费',
      learnMore: '了解更多',
      trustedBy: '信赖我们的客户'
    },

    sections: {
      whatWeDo: {
        title: '我们的服务',
        subtitle: '以1%的成本和时间获得可信的碳足迹',
        scrollingText1: 'Gain Credibility At Low Cost',
        scrollingText2: 'Use Credit At Low Cost'
      },
      personas: {
        title: '为每个团队设计',
        carbonExpert: {
          title: '碳/ESG专业人士',
          role: 'ESG/可持续/碳/咨询专家',
          needs: '我需要自动化、智能化工具，提高工作效率和报告精准度',
          stat: '1分钟LCA & 95%准确率',
          statDescription: '大幅缩短等待时间 & 确保信心',
          secondStatDescription: '自动批量因子匹配',
          thirdStatDescription: '确保可审计 & 可比较数据',
          fourthStat: 'DQR+行业数据 & 字段验证',
          fourthStatDescription: '加速整个合规流程。',
          painPoints: [
            '规则和因子不匹配——结果波动±10-20%',
            '大部分数据延迟或错误——按时率低于50%',
            '每个SKU需要数天时间；大部分时间花在因子匹配上',
            '缺乏流程或数据评估——风险难以发现',
            '证据分散；外部检查缓慢且成本高昂'
          ],
          testimonial: '"Climate Seal不仅仅是另一个计算工具，而是一个支持我们大规模精确高效需求的智能操作系统。"',
          author: '陈博士',
          position: 'EcoStrategy高级ESG顾问'
        },
        brandOwner: {
          title: '品牌方和采购负责人',
          role: '可持续负责人',
          needs: '我需要完成品牌和供应链降碳目标，降低供应链碳管理成本和压力，让供应链无痛提供高质量碳排放数据',
          stat: '≈$100 / 4 小时 / 每个SKU',
          statDescription: '降低合规成本与时间',
          secondStatDescription: '内置数据质量门槛',
          thirdStatDescription: '确保一致与可比较的数据',
          fourthStat: '为供应商精简的一体化流程',
          fourthStatDescription: '支撑严格的减碳与采购',
          painPoints: [
            '供应链企业缺乏专业知识，合规成本高且繁重',
            '无尽止地追踪供应链数据；按时交付率仅为40-70%',
            '数据质量差影响去碳化优先级排序',
            '缺乏ROI或MACC，项目无法获得批准，阻碍SBTi/CSRD里程碑'
          ],
          testimonial: '"Climate Seal将我们的供应链碳管理从合规负担转变为竞争优势。"',
          author: '王明',
          position: 'GreenTech Corp首席可持续官'
        },
        supplyChain: {
          title: '供应商和出口商',
          role: '出口企业合规负责人',
          needs: '我需要低成本、高效率的向进口方和下游客户提供可信碳足迹报告，确保销售不受影响',
          stat: '3 个文件与一个简单流程',
          statDescription: '显著降低合规成本',
          secondStatDescription: '自动匹配与内置验证',
          thirdStatDescription: '首次提交90%+通过率',
          fourthStat: '4小时，核验就绪PCF',
          fourthStatDescription: '轻松满足合规要求',
          painPoints: [
            'PCF报告需要4-8周，错过RFQ/招标截止日期',
            '返工周期延迟出货，可能面临海关扣留风险',
            '缺乏内部碳专业知识，第三方咨询费用高昂'
          ],
          testimonial: '"通过Climate Seal，我们现在能够以传统成本和时间的一小部分提供世界级的碳足迹报告。"',
          author: '李伟',
          position: '全球制造有限公司合规总监'
        }
      },
      aiAssistants: {
        title: '遇见您的AI碳足迹专家团队',
        subtitle: '选择您的角色，您的AI碳足迹专家和助手已准备好为您提供24/7全天候支持。',
        comingSoon: '即将推出',
        getStarted: '预约演示，首份报告免费',
        trustCenter: '访问资源中心',
        assistants: {
          carbonExpert: {
            carbonCalculator: {
              title: '合规导航助手',
              description: '智能匹配您的业务到正确标准，自动锁定规则集，让合规检查更快更准确。'
            },
            complianceTracker: {
              title: '数据管理助手',
              description: '自动整理和解析BOM等复杂数据，确保数据及时可用，无需人工清理和核对。'
            },
            climateSeal: {
              title: 'PCF建模专家',
              description: '智能批量匹配排放因子，从BOM、能源、物流数据自动计算PCF，让您从繁琐的逐行查找中解脱出来。'
            },
            supplyChainAnalyzer: {
              title: '质量风险分析师',
              description: '提供字段级质量评分和风险预警，给出修复建议，确保报告一次性通过验证。'
            },
            reportGenerator: {
              title: '外部交叉验证器',
              description: '对照第三方报告和公开数据集交叉验证报告值，几分钟内返回带证据链接的置信度匹配结果，标记冲突以快速解决。'
            },
            dataValidator: {
              title: '风险筛查器',
              description: '评分法规/披露/供应链/声誉风险，排名前10个暴露风险，并生成带有边际减排成本（USD/tCO₂e）和ROI的90天修复计划。'
            }
          },
          brandOwner: {
            brandAnalyzer: {
              title: '供应商接取和调度',
              description: '在您的整个供应链中推送任务和AI工具——供应商零摩擦运行AI计算，无额外成本，减少供应商负担。'
            },
            scopeTracker: {
              title: '供应商风险和评分',
              description: '对计算过程和结果进行评分，标记风险，一目了然地看到供应商提交的排放是否符合您的质量标准。'
            },
            sustainabilityReporter: {
              title: '里程碑追踪器',
              description: '自动追踪数据收集进度，确保准确、按时的数据，使去碳和合规时间表保持正轨。'
            },
            goalManager: {
              title: '减排和SBTi规划器',
              description: '将供应商数据转化为严格的减排/SBTi计划——基于ROI并清晰优先排序——使审批更快通过。'
            }
          },
          supplyChain: {
            supplierAssessment: {
              title: 'PCF构建器',
              description: '上传您的BOM、产品规格和公用事业数据，生成可信的PCF，让您不错过RFQ/招标或出口截止日期。'
            },
            exportCompliance: {
              title: '质量和风险审查员',
              description: '严格的排放计算，包含过程质量评分和验证风险评估，减少拒绝和持留，让货物运输更稳定。'
            },
            costOptimizer: {
              title: '证据包装和提交',
              description: '自动将数据和证据打包成采购方/保证格式——一键提交，减少错误，节省时间和翻译成本。'
            },
            marketAnalyzer: {
              title: '市场分析器',
              description: '主动分析市场趋势\n和碳要求。'
            }
          }
        }
      },
      difference: {
        title: 'Climate Seal的差异化优势',
        cards: {
          flexible: {
            title: '更快速',
            description: '自动映射规则和因子 → 从BOM/能源/物流批量建模PCF → 一键生成采购方/海关报告。'
          },
          products: {
            title: '更可信', 
            description: '字段级0-100质量评分，自动修复提示，不确定性区间；外部交叉验证和证据包，分钟级置信度。'
          },
          fastValue: {
            title: '无摩擦',
            description: '低摩擦、低成本的验证级供应商数据管道——即插即用，支持SBTi和减排规划。'
          }
        }
      },
      scenarios: {
        title: '场景与价值',
        whyNeed: {
          title: '为什么需要产品碳足迹CPF？',
          export: {
            title: '出口',
            description: 'CBAM 采用默认值成本高\nESPR/DPP: 多品类要"产品护照"\n以披露: 粗披露遭遇被动核查(卫星)\n电池相关: "产品级碳足迹+电子护照"'
          },
          procurement: {
            title: '采购/绿色供应链',
            description: '品牌方: SBTi要覆盖67%Scope 3\n品牌方: 碳表现写进供方条款\n供应链压力: 数据质量要求高、成本高、碳基础差'
          },
          government: {
            title: '政府绿色采购 & 绿建EPD',
            description: '政府绿色采购：无PCF/LCA不能参与\n工程/建材：无EPD不能投标或减分'
          }
        },
        scenarioCards: {
          marketAccess: {
            title: '市场准入与跨境合规',
            companyType: '出口型企业',
            industries: '钢铁、铝材、水泥、化肥、电池、纺织、家具、轮胎、氢',
            coreDescription: '准入门槛、合规成本；政策核查风险；',
            detailDescription: '一份能够被续及客户接受的准确、核验级）PCF产品碳足迹报告与数据包，能降低合规成本、合规风险、提高竞争力/上架速度，避免退运与罚款。',
            miniCards: {
              cbam: {
                title: 'CBAM',
                description: '采用默认值成本高<br/>错报漏报产生罚款'
              },
              batteryRelated: {
                title: '电池相关',
                description: '电池相关上下游需要"产品级碳<br/>足迹 + 电子护照"'
              },
              esprDpp: {
                title: 'ESPR/DPP',
                description: '多品类欧洲销售需要"产品数字<br/>护照"'
              },
              passiveVerification: {
                title: '被动核查',
                description: '粗放露漏遭被动卫星核查/产生罚款 (EUDR)'
              }
            }
          },
          supplyChain: {
            title: '供应链与大品牌采购',
            companyType: '品牌方和供应链',
            industries: '汽车、化工与材料、电子、燃料、钢铁铝大宗、医疗器械；',
            coreConcept: '招标准入；客户优先；',
            detailDescription: '一份能够按照客户接受的PCF产品碳足迹报告+可追溯/可交换的数据包，成为RFI/RFQ入场券，可以满足国家级、企业级、低碳绝对字母代，提高供应链碳竞争力，降低碳合规成本。',
            miniCards: {
              sbti: {
                title: 'SBTi',
                description: 'SBTi 要求品牌方覆盖<br/>67%Scope 3'
              },
              biddingEntry: {
                title: '投标入口',
                description: '供应商缺乏现与进招标要求<br/>供方条款（高性强制）'
              },
              supplyChainPerformance: {
                title: '供应链碳表现',
                description: '品牌方的数据质量要求高<br/>供应链碳合规成本高<br/>碳基础差<br/>数据质量差'
              },
              dataExchangeStandards: {
                title: '数据交换标准',
                description: '按照行业标准提交碳数据<br/>汽车Catena-X<br/>化学TfS<br/>跨行业：WBCSD PACT'
              }
            }
          },
          governmentProcurement: {
            title: '政府采购与行业要求',
            companyType: '工程企业和特定行业',
            industries: '建筑、工程、医疗卫生、电子ICT、家具办公、光伏、物流；',
            coreDescription: '政府buy clean招标准入；绿色选价；销售收入；',
            detailDescription: '一份能够政府该商的PCF/EPD产品碳足迹报告+数据包，成为政府绿色采购或行业采购的关键资源，公共与机构采购或比可打分，没有合规就没有机会参与投标。',
            miniCards: {
              governmentBuyClean: {
                title: '政府Buy Clean',
                description: '强制提交第三类EPD<br/>设置GWP门槛/优先'
              },
              greenBuilding: {
                title: '绿色建筑',
                description: '绿建产品EPD；<br/>欧美申方力/欧引用到投标文件，<br/>作为招标门槛'
              },
              industryRequirements: {
                title: '行业要求',
                description: 'ICT硬件=EPEAT 气候标准<br/>航空燃油=SAF<br/>医疗与生命科学=英国NHS<br/>家具与办公用品=BIFMA LEVEL<br/>时装/纺织=法国AGEC/ESPR/DPP'
              }
            }
          }
        },
        painPoints: {
          title: '完成产品碳足迹CPF过程中的痛点',
          highBarrier: {
            title: '门槛高',
            description: '需要懂方法+懂交付的碳专家参与\n碳法规和标准多'
          },
          highCost: {
            title: '成本高',
            description: 'PCF或LCA报告需要数万美金'
          },
          longCycle: {
            title: '周期长',
            description: 'PCF1-3个月/EPD 需要 3-6个月'
          },
          supplyChainPressure: {
            title: '供应链压力大',
            description: '供应链企业碳基础差、数据质量差、成本高\n品牌方碳管理成本高'
          },
          hiddenCost: {
            title: '隐形成本',
            description: 'CBAM用默认值成本高\nPCF缺项被核验机构打回返工'
          }
        },
        painSection: {
          title: '我们理解你完成碳足迹的痛苦',
          solutionTitle: 'Climate Seal希望改变这一切',
          cards: {
            costHigh: {
              title: '成本高',
              description: '完整LCA/EPD需要<br/>几千到几万美金<br/><br/>'
            },
            cycleLong: {
              title: '周期长',
              description: 'PCF1-3个月<br/>EPD 3-6个月<br/>容易超期且不可靠'
            },
            barrierHigh: {
              title: '门槛高',
              description: '标准法规多头<br/>法规动态更新变化快<br/>需要懂方法+懂交付专家参与'
            },
            supplyChainPressure: {
              title: '供应链压力大',
              description: '品牌方供应链管理压力大<br/>(覆盖67%Scope 3)<br/>供应商碳基础差（外采服务成本高）<br/>供应商数据质量/可信度差'
            },
            hiddenCost: {
              title: '隐形成本',
              description: '(CBAM)<br/>用默认值成本高<br/>容易漏报和错报-罚款<br/>逐年增加需要评估预算'
            },
            rework: {
              title: '反复返工',
              description: '数据口径与核查机构偏差<br/>出现数据缺漏或者口径不一致<br/>重复打回和修改'
            }
          },
          solution: {
            costReduction: {
              title: '↓99%',
              description: '成本（百元级）<br/>周期（小时级）'
            },
            zeroBarrier: {
              title: '0门槛',
              description: '专家级碳顾问全程引导<br/>无需专业背景'
            },
            preValidation: {
              title: '预核验',
              description: '专家级预先核验<br/>拒绝返工&隐形成本'
            }
          }
        },
        ourSolution: {
          title: '我们能为您提供什么？\n我们提供的方案',
          zeroBarrier: {
            title: '0门槛',
            description: '专家级碳顾问和认证顾问全程引导/无需专业背景'
          },
          lowCost: {
            title: '成本(百元) / 周期(小时)',
            description: '99%'
          },
          preValidation: {
            title: '专家级"预核验"',
            description: '拒绝返工/隐形成本'
          }
        }
      },
      comparison: {
        title: '与传统方式对比',
        subtitle: '为什么选择Climate Seal AI？'
      },
      valueForUser: {
        title: '用户与企业价值',
        subtitle: '选择合适的方案开始您的碳足迹之旅'
      },
      aboutUs: {
        title: '关于我们',
        subtitle1: '低成本获得可信度',
        subtitle2: '低成本使用信用',
        subtitle3: '留出更多时间和预算用于',
        highlightText: '脱碳化'
      },
      pricing: {
        title: '价格方案',
        subtitle: '选择合适的方案开始您的碳足迹之旅',
        plans: {
          free: {
            title: '自助服务',
            description: '独立使用AI智能体生成报告',
            price: '$98',
            features: ['200个BOM行排放因子匹配（相当于PCF 2-4个报告）', 'Climate Seal AI智能体全程指导', '4小时内生成审计就绪报告'],
            button: '联系销售'
          },
          standard: {
            title: '代客服务',
            description: '您提供数据，我们处理其余一切',
            price: '$300',
            features: ['只需提供3个文件（产品描述；BOM文件；能耗数据）', '我们将在48小时内交付审计就绪的报告'],
            button: '联系销售'
          },
          enterprise: {
            title: '企业版',
            description: '为大型组织定制解决方案',
            price: '定制',
            features: ['供应链管理（所有企业账户的标准组件）', 'ERP/CRM集成'],
            button: '联系销售'
          }
        }
      },
      value: {
        cards: {
          cost: {
            title: '将报告成本降至约1%',
            subtitle: '成本降低',
            description: '面向财务与可持续团队：每份可信报告低于70美元'
          },
          time: {
            title: '从数月到数小时',
            subtitle: '时间节省',
            description: '面向运营团队：将多月周期压缩到小时级'
          },
          barrier: {
            title: '零经验要求',
            subtitle: '零门槛',
            description: '面向任何角色：在引导下生成一致可信的结果'
          },
          trusted: {
            title: '验证级可信度',
            subtitle: '审计就绪',
            description: '面向合规与买方：附证据链的可审计输出'
          }
        }
      },
      moreInfo: '获取更多信息'
    },
    features: {
      card1: {
        title: '自动法规匹配与LCA构建',
        description: '输入产品名称和销售地区，引擎获取最新的EU电池法规2023/1542和ISO 14067要求，然后在30秒内生成合规边界和基础LCA。',
        detail: '消除90%的法规研究工作量，提供多标准就绪模型，轻松通过审计和客户审查。'
      },
      card2: {
        title: 'BOM秒级解析',
        description: '拖放Excel或ERP BOM，系统立即提取层次结构、数量和材料——无需逐行输入。',
        detail: '数千零件的装配在几分钟内即可准备计算，工程、财务和碳排放团队可基于同一结构化表格工作。'
      },
      card3: {
        title: '智能排放因子匹配',
        description: '引擎实时匹配BOM行项、能源和物流数据与ecoinvent等数据库，返回最优因子和来源。',
        detail: '节省数周的手动查找时间，完全可追溯的因子可即时通过审计或客户抽查。'
      },
      card4: {
        title: '质量与风险分析',
        description: '一键构建数据质量雷达图、±95%蒙特卡洛区间和热力图，标记高影响、低质量项目——汇总整体信任评分。',
        detail: '团队可看到驱动80%不确定性的关键20%输入，量化的置信区间为投资者、审计师和保险公司提供可靠的风险指标。'
      },
      card5: {
        title: '端到端定制服务',
        description: '供应链模块批量邀请2/3级供应商，让AI自动计算其碳足迹，并与SAP Green Ledger、Oracle NetSuite等ERP/SRM套件双向同步。经信用评分的高质量数据可打包为碳资产并关联金融合作伙伴。',
        detail: '供应商能以通常成本的1%创建审计级报告，只共享最终数字以保持安全；品牌获得高信任度结果并将供应链碳管理成本削减90%+。经信贷审核的数据可货币化为碳资产或绿色贷款抵押品，提前释放气候价值。'
      }
    },
    comparison: {
      title: '为什么选择Climate Seal AI？',
      subtitle: '传统方法与我们AI驱动解决方案的对比',
      aiAgent: {
        title: 'AI智能体',
        steps: '4\n步骤',
        stepList: ['① 最少数据', '② 确认', '③ 发送验证方', '④ 认证']
      },
      consultant: {
        title: '第三方碳顾问 + 碳核算软件',
        steps: '11\n步骤',
        stepList: ['① 培训', '② 文档+法规映射', '③ 数据清单', '④ 数据清理', '⑤ 填补空缺', '⑥ 构建模型', '⑦ 因子匹配', '⑧ 提交', '⑨ 问题清单', '⑩ 修正', '⑪ 认证']
      },
      traditional: {
        title: '第三方碳顾问',
        steps: '12\n步骤',
        stepList: ['① 启动', '② 信息搜索', '③ 数据准备', '④ 清理+访谈', '⑤ 计算模型', '⑥ 因子计算', '⑦ 报告草案', '⑧ 审查', '⑨ 提交验证方', '⑩ 问题反馈', '⑪ 信息修正', '⑫ 认证']
      }
    },
    contact: {
      title: '联系我们',
      subtitle: '获取您的第一份核验级报告。预约与我们团队的通话，了解碳核算可以多么简单。',
      description: '联系我们的团队',
      form: {
        name: '姓名',
        email: '邮箱',
        phone: '电话',
        company: '公司名称',
        industry: '行业',
        message: '留言',
        submit: '发送消息',
        submitting: '发送中...',
        privacyDisclaimer: '*我向 Climate Seal 披露我的信息。我已阅读并同意 Climate Seal 的隐私政策',
        placeholder: {
          name: '请输入您的姓名',
          email: '请输入您的邮箱',
          phone: '请输入您的电话号码',
          company: '请输入公司名称',
          industry: '请选择您的行业',
          message: '请描述您的需求或问题'
        },
        industries: {
          automotive: '汽车制造业',
          electronics: '电子电器',
          textiles: '纺织服装',
          chemicals: '化工化学',
          foodBeverage: '食品饮料',
          construction: '建筑建材',
          metals: '钢铁金属',
          plastics: '塑料橡胶',
          packaging: '包装印刷',
          pharmaceuticals: '医药医疗',
          energy: '能源电力',
          manufacturing: '机械制造',
          furniture: '家具家居',
          cosmetics: '美妆个护',
          toys: '玩具用品',
          agriculture: '农业食品',
          transportation: '交通运输',
          retail: '零售贸易',
          other: '其他'
        }
      },
      messages: {
        success: '消息发送成功！我们会尽快回复您。',
        error: '发送失败，请稍后重试或直接发送邮件至 xuguang.ma@climateseal.net',
        validation: '请填写所有必需字段'
      }
    },
    footer: {
      description: 'AI驱动的碳核算平台，为可持续商业解决方案提供支持。',
      quickLinks: '快速链接',
      contact: '联系方式',
      followUs: '关注我们',
      copyright: '© 2024 Climate Seal. 保留所有权利。',
      privacyPolicy: '隐私政策'
    },
    pages: {
      about: {
        title: '关于Climate Seal',
        content: '关于页面内容正在建设中...'
      },
      products: {
        title: '我们的产品',
        content: '产品页面内容正在建设中...'
      },
      pricing: {
        title: '价格方案',
        content: '价格页面内容正在建设中...'
      }
    },
    privacy: {
      title: '隐私政策',
      subtitle: '您的隐私对我们很重要',
      backToHome: '返回首页',
      lastUpdated: '最后更新',
      updateDate: '2024年12月',
      sections: {
        introduction: {
          title: '1. 简介',
          content: 'Climate Seal（"我们"、"我们的"或"本公司"）致力于保护您的隐私。本隐私政策说明了当您访问我们的网站并使用我们的碳足迹服务时，我们如何收集、使用、披露和保护您的信息。'
        },
        dataCollection: {
          title: '2. 我们收集的信息',
          personalInfo: '个人信息',
          items: {
            name: '姓名和联系信息',
            email: '电子邮件地址',
            company: '公司信息',
            usage: '使用数据和分析信息'
          }
        },
        dataUsage: {
          title: '3. 我们如何使用您的信息',
          items: {
            service: '提供和维护我们的服务',
            communication: '就我们的服务与您沟通',
            improvement: '改进我们的网站和服务',
            legal: '遵守法律义务'
          }
        },
        dataSharing: {
          title: '4. 信息共享',
          content: '未经您同意，我们不会向第三方出售、交易或以其他方式转让您的个人信息，除非本政策中所述或法律要求。'
        },
        security: {
          title: '5. 数据安全',
          content: '我们实施适当的安全措施来保护您的个人信息免受未经授权的访问、更改、披露或破坏。'
        },
        rights: {
          title: '6. 您的权利',
          intro: '您有权：',
          items: {
            access: '访问您的个人信息',
            correct: '更正不准确的信息',
            delete: '要求删除您的信息',
            portability: '数据可携性'
          }
        },
        contact: {
          title: '7. 联系我们',
          content: '如果您对本隐私政策有任何疑问，请通过以下方式联系我们：'
        }
      }
    }
    ,
    faq: {
      title: '常见问题 FAQ',
      seo: {
        title: '常见问题 | Climate Seal',
        description: '关于产品、功能、价格与支持的常见问题。',
        indexable: true,
      },
      groups: [
        {
          name: '产品',
          items: [
            {
              q: '常见使用场景',
              a: [
                '品牌方招标需要供应商提供 PCF、出口其他国家地区的商品需要披露 PCF；碳税、电池、DPP 数字护照等场景也都需要以 PCF 作为支撑。'
              ]
            },
            {
              q: 'Climate Seal 是做什么的？跟传统咨询有什么不同？',
              a: [
                '面向产品碳足迹（PCF）的 AI 一体化计算与合规交付平台。将 BOM 清洗、因子匹配、计算、风险评估、审计证据打包自动化完成；相比咨询项目（数周-数月），数小时出结果，成本可降 90%+。'
              ]
            },
            {
              q: '开始用需要提供哪些数据？会不会很难？',
              a: [
                '三个最少文件即可：产品说明/BOM/能耗/物流；缺项可用行业默认或相似工艺暂填，并标注假设与不确定性。系统提供向导式模板、单位校验与自动补全；在资料不全时，会引导找到数据所有者并帮助其理解数据格式与要求，实现低门槛的数据获取。'
              ]
            },
            {
              q: '多快能拿到第一个结果？准确性受什么影响？',
              a: [
                '从导入三个文件到产生结果约需 1–2 小时；加上风险评估与矫正，总时长约 2–4 小时。供应链碳管理因供应商数量与产品复杂度会更久，我们先覆盖前 80% 排放贡献，再迭代长尾。准确性主要取决于：BOM 与能耗信息的完整度，以及对业务流程的理解清晰度。'
              ]
            },
            {
              q: '如何核算 Scope 3 范畴 1（采购的商品与服务）？',
              a: [
                '遵循“供应商特定优先 → 混合法 → 平均因子 → 支出法（EEIO）兜底”的路线；边界为 cradle-to-gate；与范畴 2/4/5 明确分工防止双算；为每条采购项给出 DQR 与不确定性，后续拿到更好数据可回填重算。'
              ]
            },
            {
              q: '结果靠不靠谱？能审计/可验证吗？',
              a: [
                '对齐 ISO 14067，内置 DQR 数据质量评分、风险分析、不确定性与数据血缘；一键导出审计包，可对接第三方核证（SGS/BSI/TÜV 等）。'
              ]
            },
            {
              q: 'BOM 能否批量导入并自动匹配因子？',
              a: [
                '支持 Excel/CSV 批量导入（可处理上百行 BOM）；系统进行多层级解析、单位清洗、规格抽取，并用规则 + AI 批量因子匹配（可设置信心阈值与人工复核队列）。'
              ]
            },
            {
              q: '交付物与格式有哪些？能满足 CBAM / PEF / EPD / DPP 吗？',
              a: [
                '输出 PDF 报告 + 机器可读格式（CSV/JSON）+ 审计包；可按用户要求生成数据格式，并提供二维码便于外显与复用。'
              ]
            },
            {
              q: '供应商不配合/数据不全怎么办？',
              a: [
                '提供供应商轻量门户与 AI 顾问，支持邀请与任务分发/自动提醒；AI 顾问引导供应商低门槛补数，无需品牌方培训；可约束并验证供应商上传数据质量，回填达标后自动重算；全程留痕，便于审核。'
              ]
            },
            {
              q: '我的数据归谁？安全吗？',
              a: [
                '数据与结果归客户；Climate Seal 不保留用户原始数据，提供操作日志留痕。可按需启用数据驻留与导出/删除；亦支持本地化部署以保障数据安全。'
              ]
            }
          ]
        },
        {
          name: '价格',
          items: [
            {
              q: '价格与试用怎么安排？',
              a: [
                '提供 1 个报告的免费试用额度；正式版按计算额度（request credits）计费。目标是将一次 PCF 的时间与费用降至传统路径的 1%。'
              ]
            }
          ]
        },
        {
          name: '其他',
          items: [
            {
              q: '“产品碳足迹（PCF）”与“企业碳核算（Scope 1/2/3）”的区别？',
              a: [
                'PCF 衡量的是单个产品全生命周期的温室气体排放，关注对象是产品（原材料/半成品/成品）；企业碳核算遵循 GHG Protocol，将企业排放分为 Scope 1/2/3，关注对象是组织层面的总体排放（整体能耗/员工活动等）。'
              ]
            }
          ]
        }
      ]
    }
  }
};

// 默认语言
export const DEFAULT_LANGUAGE: Language = 'en';