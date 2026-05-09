from __future__ import annotations

import copy
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


SRC = Path("/Users/lucindaliu/Downloads/business plan -绿色经济采信基础设施04-19.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_preserved_v2.pptx")

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}
ET.register_namespace("a", NS["a"])
ET.register_namespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
ET.register_namespace("p", NS["p"])


GLOBAL_REPLACEMENTS: list[tuple[str, str]] = [
    ("提交方", "Submitter"),
    ("验收方", "Acceptor"),
    ("付费方", "Paying Side"),
    ("驱动", "Driver"),
    ("影响", "Impact"),
    ("行动", "Action"),
    ("合规", "Compliance"),
    ("资产", "Assets"),
    ("绿金", "Green Finance"),
    ("绿色金融", "Green Finance"),
    ("碳合规", "Carbon Compliance"),
    ("碳资产", "Carbon Assets"),
    ("商业化", "Commercialization"),
    ("产品&碳Ai", "Product & Carbon AI"),
    ("产品&Ai", "Product & AI"),
    ("Ai&数据工程", "AI & Data Engineering"),
    ("市场&营销", "Market & GTM"),
    ("顶级领域专家", "Top Domain Experts"),
    ("创始人", "Founder"),
    ("联创-市场", "Co-founder, Market"),
    ("联创-产品", "Co-founder, Product"),
    ("联创-AI", "Co-founder, AI"),
    ("核验专家", "Verification Expert"),
    ("可持续/碳专家", "Sustainability / Carbon Expert"),
    ("可持续专家", "Sustainability Expert"),
    ("碳排放专家", "Carbon Emissions Expert"),
    ("认证专家", "Certification Expert"),
    ("领域专家", "Domain Expert"),
    ("Ai科学家/博士", "AI Scientist / PhD"),
    ("Ai科学家", "AI Scientist"),
    ("全球青年可持续联盟（GELA）", "Global Youth Sustainability Alliance (GELA)"),
    ("亚洲创业博览会亚军", "Runner-up, Asia Startup Expo"),
    ("研发50%", "R&D 50%"),
    ("渠道25%", "Channels 25%"),
    ("市场15%", "Marketing 15%"),
    ("运营10%", "Operations 10%"),
]


SLIDE_REPLACEMENTS: dict[int, list[tuple[str, str]]] = {
    1: [
        (
            "绿色经济「采信」基础设施",
            "AI\nNative\nTrust Infrastructure\nfor the Green Economy\n—\nHelping companies,\nproducts, and financial assets\nprove they are green,\npass market and regulatory acceptance,\nand build the Visa layer\nfor the green economy",
        ),
    ],
    2: [
        (
            "市场不缺资产，而是80%资产被“采信难”锁死",
            "The market does not lack assets.\n80% of assets are locked by\nacceptance friction.\n\nWhat really blocks circulation is\nacceptance friction =\nproof friction + approval friction.",
        ),
        ("绿色经济>$10T", "Green Economy\n>$10T"),
        ("采信阀门多10%=释放$1T", "Acceptance Valve\n+10% =\nunlock $1T"),
        ("流通池=~20%", "Circulation Pool\n~20%"),
        ("10亿吨库存", "1B tons\ninventory"),
        ("碳资产/RWA", "Carbon Assets /\nRWA"),
        ("140万供应链企业20亿批次产品", "1.4M supply-chain firms\n2B product batches"),
        ("合规市场", "Compliance\nMarket"),
        ("绿色金融€7.4T绿色资产", "Green Finance\nEUR7.4T green assets"),
        ("22%方法学采信=180Mt/年", "22%\nmethodology acceptance\n= 180Mt/yr"),
        ("600亿美金年合规采信花费", "$60B\nannual compliance\nacceptance cost"),
        ("11%通过Taxonomy采信=€816bn", "11%\npass Taxonomy\n= EUR816bn"),
        ("瓶颈：采信（绿色证明&验收）", "Bottleneck:\nacceptance\n(proof & approval)"),
    ],
    3: [
        (
            "根因：证明太贵、验证太贵、两方口径差异大",
            "Root cause:\nproof is expensive,\nvalidation is expensive,\nand the two sides use\ndifferent standards.\n\nThe issue is not that assets are not green.\nThe issue is that making green proof acceptable\nto markets and regulators is too costly and inconsistent.",
        ),
        ("提交方：企业/资产开发方/贷款方", "Submitters:\ncompanies / asset developers /\nlenders"),
        ("验收方：品牌方海关/资产买方/银行", "Acceptors:\nbrands / customs /\nasset buyers / banks"),
        ("方法学合规", "Methodology\nCompliance"),
        ("证据链合规", "Evidence-Chain\nCompliance"),
        ("证明输出", "Proof\nOutput"),
        ("3-12个月$5-300k合规专家手工", "3-12 months\n$5k-$300k\nmanual compliance experts"),
        ("6周起$5-400k风控专家手工", "6+ weeks\n$5k-$400k\nmanual risk experts"),
        ("· 6周起· $5-400k ·风控专家手工 ", "• 6+ weeks • $5k-$400k • manual risk experts"),
        ("· 6周起· $5-400k ·风控专家手工", "• 6+ weeks • $5k-$400k • manual risk experts"),
        ("风控专家手工", "• 6+ weeks • $5k-$400k • manual risk experts"),
        ("准入规则", "Eligibility\nRules"),
        ("风险评估", "Risk\nAssessment"),
        ("交割状态", "Settlement\nStatus"),
        ("锁住80%资产流通", "80% of assets\nremain blocked"),
        ("口径差异", "Standards\nMismatch"),
        ("绿色证明（合规口径）", "Green Proof\n(compliance lens)"),
        ("重算重审", "Recalculate\nRe-audit"),
        ("交易/融资失败", "Trade / Financing\nFails"),
        ("绿色验收（采购/风控口径）", "Green Acceptance\n(procurement / risk lens)"),
    ],
    4: [
        (
            "不同碳场景，本质是同一条决策链的统一市场",
            "Different carbon scenarios\nare one unified market\nbuilt on the same decision chain.\n\nSubmitter proof -> Acceptor decision ->\nCompliance / capital / transaction flow",
        ),
        ("品牌方审计/海关", "Brands / Audit /\nCustoms"),
        ("出口制造供应链", "Export Manufacturing /\nSupply Chain"),
        ("碳合规（140万企业/20亿批次产品）", "Carbon Compliance\n(1.4M firms /\n2B product batches)"),
        ("碳资产/RWA&碳配额（10亿吨库存/1万+企业参与配额）", "Carbon Assets / RWA /\nAllowances\n(1B tons inventory /\n10k+ participants)"),
        ("绿色金融/RWA（0.8万亿欧元贷款和债券）", "Green Finance / RWA\n(EUR0.8T loans\nand bonds)"),
        ("决定采购订单/税费/准入", "Decides orders /\ntaxes /\nmarket access"),
        ("品牌方交易所", "Brands /\nExchanges"),
        ("林业燃料航空", "Forestry /\nFuel /\nAviation"),
        ("决定交易成败和定价", "Decides trade success\nand pricing"),
        ("银行SPO/投资", "Banks /\nSPO /\nInvestors"),
        ("品牌方政府", "Brands /\nGovernment"),
        ("决定融资额度和利率", "Decides credit size\nand interest rate"),
        ("400亿美金(1w+外部咨询机构)", "$40B\n(10k+ external\nconsulting firms)"),
        ("300亿美金(3k+外部开发机构）", "$30B\n(3k+ external\ndevelopers)"),
        ("300亿美金 (3k+外部开发机构)", "$30B\n(3k+ external\ndevelopers)"),
        ("300亿美金 (3k+外部开发机构)", "$30B\n(3k+ external developers)"),
        ("外部开发机构", "$30B\n(3k+ external developers)"),
        ("200亿美金(300+外部评估机构）", "$20B\n(300+ external\nassessors)"),
        ("品牌方 审计/海关", "Brands / Audit /\nCustoms"),
        ("出口制造 供应链", "Export Manufacturing /\nSupply Chain"),
        ("品牌方  交易所", "Brands /\nExchanges"),
        ("林业  燃料 航空", "Forestry /\nFuel /\nAviation"),
        ("品牌方   政府", "Brands /\nGovernment"),
    ],
    5: [
        (
            "解决方案:把证明和验收,做成一套引擎+两套标准Ai产品",
            "Solution:\none engine and two\nstandardized AI products\nfor proof and acceptance.\n\nPassport = reusable digital proof\nGate = automated acceptance engine",
        ),
        ("数据采集处理", "Data Collection\nProcessing"),
        ("方法学导航建模/核算", "Methodology Guidance\nModeling / Calculation"),
        ("风险评估证据链/审计", "Risk Assessment\nEvidence / Audit"),
        ("验收规则融合/建模", "Acceptance Rules\nFusion / Modeling"),
        ("数据整理", "Data Prep"),
        ("方法学/核算", "Methodology /\nCalculation"),
        ("合规报告", "Compliance\nReport"),
        ("核验/流通", "Verification /\nCirculation"),
        ("方法学/设计", "Methodology /\nDesign"),
        ("项目设计", "Project\nDesign"),
        ("核验/签发", "Verify /\nIssue"),
        ("交易/尽调", "Trade /\nDue Diligence"),
        ("方法学/风险", "Methodology /\nRisk"),
        ("风险凭证", "Risk\nCredential"),
        ("核验/上架", "Verify /\nList"),
        ("放贷/尽调", "Lending /\nDue Diligence"),
        ("转手交易", "Secondary\nTrade"),
        ("触发条款", "Covenant\nTriggers"),
        ("多方法学引擎", "Multi-Methodology\nEngine"),
        ("自审计引擎", "Self-Audit\nEngine"),
        ("自审计自动化AI引擎", "Self-Auditing\nAutomation AI Engine"),
        ("风险评估尽调/复核", "Risk Assessment\nDue Diligence /\nReview"),
        ("交易状态条款触发", "Transaction Status\nCovenant Triggers"),
        ("验收规则前置打通口径差异", "Front-load acceptance rules\nBridge standards gaps"),
        ("绿色护照", "Green\nPassport"),
        ("验收闸机", "Acceptance\nGate"),
        ("$5-300k$0.2-30k", "$5k-$300k\n$0.2k-$30k"),
        ("3-12个月小时-周级", "3-12 months\nhours-weeks"),
        ("口径差异大同口径采信", "Fragmented standards\nOne shared standard"),
        ("Ai绿色证明编译器", "AI Green Proof\nCompiler"),
        ("Ai验收执行引擎", "AI Acceptance\nExecution Engine"),
    ],
    6: [
        (
            "底层技术:自审计式自动化Ai引擎",
            "Core Technology:\nSelf-Auditing\nAutomation AI Engine\n\nPutting consulting and audit\nexpertise into an AI pipeline\nso agents can complete\ncompliance and acceptance\nwithin auditable boundaries.",
        ),
        ("半黑盒/难追溯", "Semi-Black Box /\nHard to Trace"),
        ("手动导航", "Manual\nNavigation"),
        ("手动审计", "Manual\nAudit"),
        ("手动记录/证据链", "Manual Logging /\nEvidence Chain"),
        ("半黑盒精度差", "Semi-Black Box /\nLow Precision"),
        ("手动方法学导航", "Manual Methodology\nNavigation"),
        ("手动审计/记录", "Manual Audit /\nLogging"),
        ("手动数据处理", "Manual Data\nProcessing"),
        ("执行链", "Execution\nChain"),
        ("可信数据链白盒/高精度", "Trusted Data Chain\nWhite Box /\nHigh Precision"),
        ("审计链", "Audit\nChain"),
        ("提交方专家组", "Submitter\nExperts"),
        ("手工慢/易错", "Manual /\nSlow /\nError-Prone"),
        ("AI方法学导航", "AI Methodology\nNavigation"),
        ("Ai数据处理", "AI Data\nProcessing"),
        ("Ai审计评估", "AI Audit /\nEvaluation"),
        ("提交方Ai引擎", "Submitter\nAI Engine"),
        ("验证方专家组", "Verifier\nExperts"),
        ("验证方Ai引擎", "Verifier\nAI Engine"),
        ("6大关卡(100+数据岔口)", "6 key checkpoints\n(100+ data branches)"),
        ("白盒/100%追溯", "White Box /\n100% Traceable"),
        ("自动快/高精度", "Automated /\nFast /\nHigh Precision"),
        ("口径差异-返工", "Standards Mismatch\nRework"),
        ("打通口径越用越准", "Bridge Standards\nImproves with Use"),
        ("Ai证据编排", "AI Evidence\nOrchestration"),
        ("合规审计||资产评估||金融风控", "Compliance Audit\nAsset Valuation\nFinancial Risk Control"),
        ("60+方法学模型50+自动工作流20k+因子验证20k+基准模型", "60+ methodology models | 50+ workflows |\n20k+ factor validations | 20k+ benchmark models"),
        ("60+方法学模型 | 50+自动工作流 | 20k+因子验证 | 20k+基准模型", "60+ methodology models | 50+ workflows |\n20k+ factor validations | 20k+ benchmark models"),
        ("自动工作流", "60+ methodology models | 50+ workflows |\n20k+ factor validations | 20k+ benchmark models"),
        ("碳领域高精地图", "High-Precision\nCarbon Map"),
        ("高精验收模型前置", "Front-Loaded\nAcceptance Models"),
    ],
    7: [
        (
            "业务进展:Ai引擎已成功商用",
            "Business Progress:\nthe AI engine is already\ncommercialized.\n\nValidated in compliance.\nNow expanding into\nasset development.",
        ),
        ("已验证:合规场景商用", "Validated:\ncommercial in\ncompliance"),
        ("将上线:碳资产+RWA场景", "Launching:\nCarbon Assets + RWA"),
        ("已锁定:资产客户+买方", "Locked In:\nasset clients + buyers"),
        ("高复杂度LCA碳足迹项目法国BV5%重大置信度（最高审计等级）", "High-complexity LCA\ncarbon footprint projects\nBV 5% materiality confidence\n(top audit standard)"),
        ("组件完成85%/2个月上线", "85% complete\nGo-live in 2 months"),
        ("10+家超级买方（中车/北汽集团）", "10+ major buyers\n(CRRC / BAIC)"),
        ("10+资产开发咨询公司（渠道）", "10+ asset development\nconsultancies\n(channel partners)"),
        ("800万吨碳资产已锁定", "8M tons of carbon\nassets locked in"),
        ("2个月内进场启动", "Onboard in\n2 months"),
        ("资产/合规护照", "Asset / Compliance\nPassport"),
        ("资产验证/闸机", "Asset Verification /\nGate"),
        ("主流资产方法学模型", "Mainstream Asset\nMethodology Models"),
        ("资产质量评估模型", "Asset Quality\nScoring Model"),
        ("10家客户/5国渠道", "10 clients /\n5-country channels"),
    ],
    8: [
        (
            "WhyNow—绿色结果开始影响税费/订单/交易和融资2026是分水岭：碳要求从“自愿填表”转向“强制和营收影响”",
            "Why Now:\ngreen outcomes are starting\nto affect taxes, orders,\ntrading, and financing.\n\n2026 is the turning point:\nfrom voluntary reporting\nto mandatory,\nrevenue-impacting rules.",
        ),
        ("合规（窗口已开）", "Compliance\n(window open)"),
        ("碳资产（窗口正开）", "Carbon Assets\n(window opening)"),
        ("绿金（6-12个月窗口）", "Green Finance\n(6-12 month window)"),
        ("EU Taxonomy中国碳市场", "EU Taxonomy\nChina carbon market"),
        ("CBAM碳稅/DPP/绿色供应链", "CBAM / DPP /\nGreen Supply Chains"),
        ("税收/订单/交易/融资（收入和成本）", "Taxes / Orders /\nTrading / Financing\n(revenue & cost)"),
        ("填表/披露/轻合规", "Reporting /\nDisclosure /\nLight Compliance"),
        ("影响出口/税费/供应链订单", "Affects exports /\ntaxes /\nsupply-chain orders"),
        ("140万企业必须立即合规", "1.4M firms must\ncomply now"),
        ("CORSIA航空碳/Art6.4碳信用", "CORSIA /\nAviation Carbon /\nArt.6.4 Credits"),
        ("碳资产高质量化/更好流转", "Higher-quality carbon\nassets / better liquidity"),
        ("跨境碳资产需求放大，需提质", "Cross-border demand\nis rising; quality must improve"),
        ("EUGBS/Taxonomy绿金合规", "EU GBS / Taxonomy\nGreen Finance Compliance"),
        ("必须可验证才能拿到利率和额度", "Must be verifiable\nto secure rates and limits"),
        ("绿金进入准入时代,必须可采信", "Green finance is entering\nan eligibility era;\nit must be trusted"),
        ("CSRD生效", "CSRD in force"),
        ("EUGBS生效", "EU GBS in force"),
        ("CBAM收费 CSRD-DPP巴黎协定Art.6EuGBS 接受监管", "CBAM charging\nCSRD-DPP\nParis Agreement Art.6\nEU GBS under supervision"),
        ("CBAM收费 CSRD-DPP巴黎协定Art.6EuGBS 接受监管", "CBAM charging / CSRD-DPP /\nParis Agreement Art.6 /\nEU GBS under supervision"),
        ("接受监管", "CBAM charging / CSRD-DPP /\nParis Agreement Art.6 /\nEU GBS under supervision"),
        ("CORSIA强制ETS2/DPP电池·中国ETS扩容", "CORSIA mandatory\nETS2 / Battery DPP\nChina ETS expansion"),
        ("CBAM下游扩围DPP扩品类配额加速削减", "CBAM downstream expansion\nDPP category expansion\nfaster allowance cuts"),
        ("EU ETS减排62%中国ETS全行业+总量控制", "EU ETS -62%\nChina ETS all sectors\n+ cap control"),
    ],
    9: [
        (
            "业务战略:合规占领入口,再向资产/金融Agent延伸",
            "Business Strategy:\nwin the compliance entry point,\nthen expand into asset and finance agents.\n\nAccumulate precision on the\nsubmitter side, embed into\nacceptance workflows,\nthen expand into three markets.",
        ),
        ("AI自审计自动化引擎（护照+闸机）", "AI Self-Auditing\nAutomation Engine\n(Passport + Gate)"),
        ("阶段1碳合规—入口（0-12月）", "Phase 1\nCarbon Compliance\nEntry\n(0-12 months)"),
        ("阶段2碳资产升级—增长（6-18月）", "Phase 2\nAsset Upgrade\nGrowth\n(6-18 months)"),
        ("阶段3绿色金融(含RWA)—利润（12-36月）", "Phase 3\nGreen Finance\n(incl. RWA)\nProfit\n(12-36 months)"),
        ("渠道：100家碳咨询公司（Ai交付提效20倍）", "Channel:\n100 carbon consultancies\n20x delivery efficiency"),
        ("1个品牌=N个供应链合规", "1 brand = N supply-chain\ncompliance cases"),
        ("裂变", "Flywheel"),
        ("渠道：30资产开发方（积压资产2亿吨待售）", "Channel:\n30 asset developers\n200M tons backlog"),
        ("资产开发商（低质量资产）", "Asset Developers\n(low-quality assets)"),
        ("1个开发商=N个资产项目", "1 developer = N\nasset projects"),
        ("买方成交", "Buyer Execution"),
        ("渠道:30贷款咨询/银行（$300亿-待认证绿色贷款）", "Channel:\n30 loan advisors / banks\n$30B awaiting certification"),
        ("绿色贷款", "Green Loans"),
        ("1家银行=N个借款方", "1 bank = N borrowers"),
        ("碳咨询公司", "Carbon\nConsultancies"),
        ("品牌方（购买数字平台）", "Brands\n(buy the digital platform)"),
        ("推荐", "Referral"),
        ("资产升级", "Asset\nUpgrade"),
        ("认证升级", "Certification\nUpgrade"),
        ("发行绿色ABS", "Issue Green\nABS"),
        ("护照用量", "Passport\nVolume"),
        ("闸机嵌入量", "Gate\nIntegration"),
        ("咨询公司用", "Consultancy\nUsage"),
        ("品牌方验证", "Brand\nVerification"),
        ("+资产开发商用", "+ Asset Developer\nUsage"),
        ("+买方/交易所接入", "+ Buyer / Exchange\nIntegration"),
        ("+贷款方/银行用", "+ Lender / Bank\nUsage"),
        ("+银行风控接入", "+ Bank Risk\nIntegration"),
        (
            "当护照用量足够大、闸机嵌入足够深两端都依赖同一套轨道，构成采信的基础设施VISA",
            "Once passport volume is high\nenough and gate integration\ngoes deep enough,\nboth sides depend on the same rails.\nThat is trust infrastructure.\nVisa-like.",
        ),
        ("客户转换", "Customer\nConversion"),
    ],
    10: [
        (
            "交易放大器：资产升级+RWA/ ITC",
            "Transaction Amplifier:\nasset upgrade + RWA / ITC.\n\nUpgrade assets to clear\ntrading and policy thresholds,\nthen monetize each lifecycle event.",
        ),
        (
            "RWA/ABS业务边界：做到RWA/ABSready，暂不做需要牌照的发行，上行延迟时1/10成本链下路径仍可增长",
            "Scope: RWA / ABS ready.\nNo licensed issuance.\nIf on-chain timing is delayed,\noff-chain growth still works\nat 1/10 the cost.",
        ),
        ("10亿吨滞压碳资产（资产质量差）", "1B tons of backlogged\ncarbon assets\n(low quality)"),
        ("资格认证", "Qualification"),
        ("发行", "Issuance"),
        ("交易", "Trading"),
        ("再融资", "Refinancing"),
        ("条款触发", "Covenant Trigger"),
        ("生命周期内(3-10年)，每个交易事件都收“绿色证明&验证费”", "Across a 3-10 year lifecycle,\neach transaction event can trigger\na green proof & verification fee."),
        ("难交易", "Hard to Trade"),
        ("难融资", "Hard to Finance"),
        ("扫描资产质量&发掘缺口", "Scan asset quality\nand find gaps"),
        ("绿色金融政策门槛（约$80B-$150B）", "Green finance policy\nthresholds\n(~$80B-$150B)"),
        ("难通过", "Hard to Qualify"),
        ("难获益", "Hard to Capture Value"),
        ("补齐缺口&映射法规标准", "Fill gaps and map\nto standards"),
        ("循环评估&输出可签字包", "Repeat assessment and\nproduce signable packages"),
        ("资产升级Ai引擎", "Asset Upgrade\nAI Engine"),
        ("高质量碳资产（提升10%价格+50%销售率）", "Higher-quality carbon assets\n+10% price uplift\n+50% sell-through"),
        ("政策价值兑现（30%税抵/60%本金补助&1%+利率补助）", "Policy value realization\n30% tax credits\n60% principal subsidy\n1%+ rate support"),
        ("RWA交易/融资轨道", "RWA Trading /\nFinancing Rail"),
        ("ITC/税抵&政策兑付", "ITC / Tax Credits /\nPolicy Payout"),
    ],
    11: [
        (
            "商业模式:先赚护照和闸机钱,再扩成事件验证和分润",
            "Business Model:\nstart with passport and gate fees,\nthen expand into event verification\nand revenue sharing.\n\nRevenue follows decision points\nand deepens as embedding grows.",
        ),
        ("2026—$3M", "2026\n$3M"),
        ("2027——$10M", "2027\n$10M"),
        ("2028——$30M", "2028\n$30M"),
        ("2030—$100M+", "2030\n$100M+"),
        ("护照费（产出证明）", "Passport Fee\n(proof output)"),
        ("产出护照（证明包）", "Output:\nPassport / proof pack"),
        ("触发生成/更新护照", "Trigger:\ncreate / update passport"),
        ("支付提交方", "Paid by:\nSubmitter"),
        ("单价base$200+按量", "Pricing:\nbase $200+\nusage-based"),
        ("闸机费（准入判断）", "Gate Fee\n(eligibility decision)"),
        ("产出验证/风险评分", "Output:\nverification / risk score"),
        ("触发上架/准入/交易", "Trigger:\nlisting / access / trade"),
        ("支付验收方", "Paid by:\nAcceptor"),
        ("单价base$30K+按量", "Pricing:\nbase $30K+\nusage-based"),
        ("交易验证费", "Transaction\nVerification Fee"),
        ("产出事件验证记录", "Output:\nevent verification record"),
        ("触发转手/融资/更新", "Trigger:\nresale / finance / update"),
        ("支付触发方", "Paid by:\nTriggering Party"),
        ("单价base$500+按量", "Pricing:\nbase $500+\nusage-based"),
        ("交易结果分润", "Outcome-Based\nRevenue Share"),
        ("产出交易/利率&额度", "Output:\npricing / rate / limit"),
        ("触发溢价/利差改善", "Trigger:\npremium / spread gain"),
        ("支付获益方", "Paid by:\nBeneficiary"),
        ("单价15%资产/2-5bps", "Pricing:\n15% upside /\n2-5 bps"),
        ("备注：只计算主力收入", "Note: core revenue only"),
        ("100咨询=100家*10份/月×$20030品牌=30家*50供应链*$1k", "100 consultancies = 100 firms * 10 files / month * $200\n30 brands = 30 firms * 50 supply chains * $1k"),
        ("500万吨×$1/吨", "5M tons * $1 / ton"),
        ("20机构×$3亿×3bps", "20 institutions * $300M * 3 bps"),
        ("200咨询+100品牌", "200 consultancies + 100 brands"),
        ("1000万吨×$1/吨", "10M tons * $1 / ton"),
        ("300咨询+300品牌", "300 consultancies + 300 brands"),
        ("200机构×$5亿×3bps", "200 institutions * $500M * 3 bps"),
        ("5,000万吨×$1/吨", "50M tons * $1 / ton"),
        ("300咨询+500品牌", "300 consultancies + 500 brands"),
    ],
    12: [
        (
            "壁垒:不只效率和成本，而是把采信能力写进流程",
            "Defensibility:\nnot just speed and cost,\nbut embedding trust into workflow.\n\nOthers optimize calculation.\nWe rebuild acceptance:\nself-auditing automation ×\ncost flywheel × workflow lock-in.",
        ),
        ("核心行业Knowhow-知识图谱", "Industry Know-How\nKnowledge Graph"),
        ("50+方法学自动化流程", "50+ methodology\nautomation workflows"),
        ("60+碳资产流程模型", "60+ carbon asset\nprocess models"),
        ("20k+基准产品模型", "20k+ benchmark\nproduct models"),
        ("12k+验证因子匹配", "12k+ validation\nfactor mappings"),
        ("资产重整ai引擎", "Asset Restructuring\nAI Engine"),
        ("自审计式自动化ai引擎", "Self-Auditing\nAutomation AI Engine"),
        ("审计级Ai护照和闸口", "Audit-Grade AI\nPassport and Gate"),
        (
            "备注：护照和闸机飞轮沉淀数据，构建绿色经济专属大模型，遵循 GDPR 及数据主权法规；授权使用聚合/脱敏数据进行模型训练与校验",
            "Note: the passport + gate flywheel\naccumulates data for a green-economy\nfoundation model, while complying with\nGDPR and data sovereignty rules.\nOnly aggregated / anonymized data is used\nfor training and validation.",
        ),
        ("工程与技术壁垒（全球唯一交付审计级结果/跨越多场景）", "Engineering & Technical Moat\nOnly system positioned to deliver\naudit-grade outputs across\nmultiple scenarios"),
        ("成本随规模下降90%+", "Trust cost drops\n90%+ with scale"),
        ("击穿点", "Breakthrough\nPoint"),
        ("成本与精度壁垒（越用越准&越便宜）", "Cost & Precision Moat\nGets more accurate\nand cheaper with use"),
        ("准协议壁垒（写入验收流程难替换）", "Protocol-Like Moat\nHard to replace once embedded\nin acceptance workflows"),
        ("护照规模↑", "Passport\nScale ↑"),
        ("闸机准确↑", "Gate Accuracy ↑"),
        ("验收流程↑", "Workflow\nEmbedding ↑"),
        ("采信成本↓", "Trust Cost ↓"),
        ("采信数量↑", "Acceptance\nVolume ↑"),
        ("自审计自动化AI引擎 ", "Self-Auditing\nAutomation AI Engine"),
        ("自审计自动化AI引擎", "Self-Auditing\nAutomation AI Engine"),
    ],
    13: [
        (
            "生态位置:向生态玩家提供采信能力",
            "Ecosystem Position:\nprovide trust capability\nto ecosystem players.\n\nThe trust layer is still missing.\nEveryone is running business.\nNo one is building the road.",
        ),
        ("融资$150M", "Funding\n$150M"),
        ("营收$147M", "Revenue\n$147M"),
        ("营收$140M", "Revenue\n$140M"),
        ("融资$104M", "Funding\n$104M"),
        ("营收$120M", "Revenue\n$120M"),
        ("融资$710M", "Funding\n$710M"),
        ("营收$50M", "Revenue\n$50M"),
        ("覆盖合规/资产/金融（提交端+验收端+事件调用）的基础设施", "Infrastructure across compliance,\nassets, and finance\n(submitters + acceptors + event calls)"),
        ("向生态提供低成本高效率的采信能力", "Low-cost, high-efficiency\ntrust capability\nfor the ecosystem"),
        ("核验", "Verification"),
        ("软件", "Software"),
        ("咨询", "Consulting"),
        ("评级", "Rating"),
        ("交易", "Trading"),
    ],
    14: [
        (
            "团队和融资：碳×产品×AI×商业化专家",
            "Team & Fundraising:\nexperts across carbon,\nproduct, AI, and commercialization.\nBuilt to create trust infrastructure.",
        ),
        ("碳独角兽商业化负责人外资中国区总经理碳阻迹/Gradle/铁山/Xerox", "Commercial lead at carbon unicorns\nChina GM at multinationals\nTan Zuji / Gradle / Tieshan / Xerox"),
        ("Gartner榜单产品经理瓦格宁根大学TOP碳公司高级产品经理", "Gartner-ranked product manager\nWageningen University\nSenior PM at top carbon company"),
        ("北京航空航天大学17年AI工程师DartAI（YC投资）", "Beihang University\n17 years in AI engineering\nDart AI (YC-backed)"),
        ("加州大学7年市场营销MSC/SOSNGO", "UC background\n7 years in marketing\nMSC / SOS NGO"),
        ("南洋理工博士BSI专家中国地质大学教授", "NTU PhD\nBSI expert\nProfessor, China University of Geosciences"),
        ("飞利浦/万宝路原可持续负责人碳资产/金融专家", "Former sustainability lead at\nPhilips / Marlboro\nCarbon asset / finance expert"),
        ("轮次:Seed金额:$200万Runway:12个月目标：100咨询公司", "Round: Seed\nAmount: $2M\nRunway: 12 months\nGoal: 100 consultancies\n+ 5 asset projects"),
    ],
    15: [
        ("碳排放&ai领域顶尖人才组成的团队", "A top team across\ncarbon and AI"),
        ("碳阻迹商业化VP外资中国区总经理碳阻迹/Gradle/铁山/Xerox", "Commercialization VP at carbon company\nChina GM at multinationals\nTan Zuji / Gradle / Tieshan / Xerox"),
        ("Gartner榜单产品经理瓦格宁根大学碳阻迹高级产品经理", "Gartner-ranked product manager\nWageningen University\nSenior PM at Tan Zuji"),
        ("北京航空航天大学17年AI工程师DartAI（YC投资）", "Beihang University\n17 years in AI engineering\nDart AI (YC-backed)"),
        ("加州大学7年市场营销MSC/SOSNGO", "UC background\n7 years in marketing\nMSC / SOS NGO"),
        ("浙江大学；", "Zhejiang University"),
        ("捂碳星球", "Wu Carbon Planet"),
        ("金兰乳业", "Jinlan Dairy"),
        ("卡耐基梅隆大学（博士）清华大学（本科）LBS&MLDM.", "Carnegie Mellon (PhD)\nTsinghua (BS)\nLBS & MLDM"),
        ("飞利浦/万宝路全球可持续负责人碳资产/金融专家", "Global sustainability lead at\nPhilips / Marlboro\nCarbon asset / finance expert"),
        ("（BV5%重大置信度）", "(BV 5% materiality confidence)"),
    ],
    16: [
        ("碳阻迹商业化VP外资中国区总经理碳阻迹/Gradle/铁山/Xerox", "Commercialization VP at carbon company\nChina GM at multinationals\nTan Zuji / Gradle / Tieshan / Xerox"),
        ("Gartner榜单产品经理瓦格宁根大学碳阻迹高级产品经理", "Gartner-ranked product manager\nWageningen University\nSenior PM at Tan Zuji"),
        ("北京航空航天大学17年AI工程师DartAI（YC投资）", "Beihang University\n17 years in AI engineering\nDart AI (YC-backed)"),
        ("加州大学7年市场营销MSC/SOSNGO", "UC background\n7 years in marketing\nMSC / SOS NGO"),
        ("飞利浦/万宝路全球可持续负责人碳资产/金融专家", "Global sustainability lead at\nPhilips / Marlboro\nCarbon asset / finance expert"),
        ("卡耐基梅隆大学（博士）清华大学（本科）LBS&MLDM.", "Carnegie Mellon (PhD)\nTsinghua (BS)\nLBS & MLDM"),
        ("南洋理工博士BSI专家中国矿业大学教授", "NTU PhD\nBSI expert\nProfessor, China University of Mining"),
        ("中国地质大学博士国际碳专家央企碳研究所负责人", "China University of Geosciences, PhD\nInternational carbon expert\nHead of SOE carbon institute"),
        ("轮次:种子金额:$2M使用:12个月目标:100咨询公司", "Round: Seed\nAmount: $2M\nRunway: 12 months\nGoal: 100 consultancies\n+ 5 assets"),
        ("碳金融/可持续专家", "Carbon Finance /\nSustainability Expert"),
    ],
    17: [
        (
            "终局与生态：绿色经济里的Visa构建采信网络",
            "End State & Ecosystem:\nthe Visa of the green economy.\n\nStart from compliance and asset RWA,\nenter buyer / bank / regulator workflows,\nand serve every green-economy transaction.",
        ),
        ("个人数据", "Personal Data"),
        ("信用", "Credit"),
        ("支付", "Payments"),
        ("Visa信用网络", "Visa\nCredit Network"),
        ("路由.验证.结算", "Routing / Verification /\nSettlement"),
        ("接受银行", "Acquiring Bank"),
        ("发行银行", "Issuing Bank"),
        ("企业数据", "Enterprise Data"),
        ("护照签发", "Passport Issuance"),
        ("护照验证", "Passport Verification"),
        ("订单/金融", "Orders /\nFinance"),
        ("银行/买方/监管", "Banks / Buyers /\nRegulators"),
        ("企业/碳专家", "Enterprises /\nCarbon Experts"),
        ("验证.路由.结算", "Verification / Routing /\nSettlement"),
        ("Climateseal护照网络", "Climate Seal\nPassport Network"),
        ("Visa—金融信用网络", "Visa\nFinancial Credit Network"),
        ("Climateseal—绿色采信网络", "Climate Seal\nGreen Trust Network"),
        ("Climate seal— 绿色采信网络", "Climate Seal\nGreen Trust Network"),
        ("Climate seal—绿色采信网络", "Climate Seal\nGreen Trust Network"),
        ("信用卡持卡人", "Cardholder"),
        ("商户", "Merchant"),
        (
            "未来提交方与验收方都会是agent——ClimateSeal为这些agent自主交易提供基础设施，让agent携带可验证护照进入市场/通过准入/在融资与交易事件中自主运行",
            "In the future, both submitters and\nacceptors will be agents.\nClimate Seal provides the infrastructure\nfor autonomous green transactions,\nso agents can carry verifiable passports\ninto markets, pass access checks,\nand operate through financing and\ntrading events.",
        ),
        ("AI护照编译", "AI Passport\nCompilation"),
        ("AI准入验证", "AI Admission\nVerification"),
        ("碳Agent", "Carbon Agent"),
        ("Agent运行碳排评估抵消/自主交易", "Agents run carbon assessment,\noffsetting, and autonomous trading"),
    ],
    18: [
        ("气候印信（北京）科技有限公司", "Climate Seal (Beijing)\nTechnology Co., Ltd."),
    ],
}


def normalize_text(tx_body: ET.Element) -> str:
    return "".join(t.text.strip() for t in tx_body.findall(".//a:t", NS) if t.text and t.text.strip())


def build_paragraphs(tx_body: ET.Element, text: str) -> list[ET.Element]:
    paragraphs: list[ET.Element] = []

    first_rpr = tx_body.find(".//a:rPr", NS)
    first_end = tx_body.find(".//a:endParaRPr", NS)
    first_ppr = tx_body.find(".//a:pPr", NS)

    def clone_style() -> ET.Element:
        if first_rpr is not None:
            return copy.deepcopy(first_rpr)
        elem = ET.Element(f"{{{NS['a']}}}rPr", {"lang": "en-US"})
        return elem

    def clone_end() -> ET.Element:
        if first_end is not None:
            return copy.deepcopy(first_end)
        return ET.Element(f"{{{NS['a']}}}endParaRPr", {"lang": "en-US"})

    for block in text.split("\n"):
        p = ET.Element(f"{{{NS['a']}}}p")
        if first_ppr is not None:
            p.append(copy.deepcopy(first_ppr))
        if block.strip():
            r = ET.Element(f"{{{NS['a']}}}r")
            rpr = clone_style()
            r.append(rpr)
            t = ET.Element(f"{{{NS['a']}}}t")
            if block.startswith(" ") or block.endswith(" "):
                t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
            t.text = block
            r.append(t)
            p.append(r)
        p.append(clone_end())
        paragraphs.append(p)
    return paragraphs


def replace_text(tx_body: ET.Element, replacement: str) -> None:
    for p in list(tx_body.findall("a:p", NS)):
        tx_body.remove(p)
    for p in build_paragraphs(tx_body, replacement):
        tx_body.append(p)


def maybe_translate(slide_no: int, tx_body: ET.Element) -> bool:
    text = normalize_text(tx_body)
    if not text:
        return False

    for fragment, replacement in SLIDE_REPLACEMENTS.get(slide_no, []):
        if fragment in text:
            replace_text(tx_body, replacement)
            return True

    for fragment, replacement in GLOBAL_REPLACEMENTS:
        if fragment in text:
            replace_text(tx_body, replacement)
            return True

    return False


def main() -> None:
    with zipfile.ZipFile(SRC, "r") as zin, zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", item.filename):
                slide_no = int(re.search(r"slide(\d+)\.xml", item.filename).group(1))
                root = ET.fromstring(zin.read(item.filename))
                for tx_body in root.findall(".//p:txBody", NS):
                    maybe_translate(slide_no, tx_body)
                zout.writestr(item, ET.tostring(root, encoding="utf-8", xml_declaration=True))
            else:
                zout.writestr(item, zin.read(item.filename))

    print(OUT)


if __name__ == "__main__":
    main()
