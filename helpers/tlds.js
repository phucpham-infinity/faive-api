const tlds = [
    ".com",
    ".net",
    ".org",
    ".info",
    ".me",
    ".io",
    ".link",
    ".click",
    ".help",
    ".global",
    ".biz",
    ".co",
    ".us",
    ".uk",
    ".co.uk",
    ".ru",
    ".de",
    ".cn",
    ".xyz",
    ".club",
    ".science",
    ".top",
    ".name",
    ".pro",
    ".xxx",
    ".guru",
    ".photography",
    ".email",
    ".london",
    ".rocks",
    ".nyc",
    ".wang",
    ".one",
    ".video",
    ".design",
    ".berlin",
    ".tips",
    ".solutions",
    ".company",
    ".today",
    ".party",
    ".website",
    ".mx",
    ".mobi",
    ".nz",
    ".nl",
    ".asia",
    ".eu",
    ".fr",
    ".it",
    ".pl",
    ".ca",
    ".ch",
    ".es",
    ".be",
    ".in",
    ".sexy",
    ".flowers",
    ".expert",
    ".space",
    ".pub",
    ".tokyo",
    ".property",
    ".work",
    ".ninja",
    ".dk",
    ".at",
    ".porn",
    ".cz",
    ".nu",
    ".tw",
    ".webcam",
    ".adult",
    ".jobs",
    ".lv",
    ".red",
    ".casa",
    ".audio",
    ".agency",
    ".life",
    ".moscow",
    ".directory",
    ".services",
    ".bayern",
    ".ren",
    ".vegas",
    ".city",
    ".digital",
    ".melbourne",
    ".band",
    ".school",
    ".world",
    ".market",
    ".paris",
    ".ac",
    ".academy",
    ".accountants",
    ".actor",
    ".apartments",
    ".art",
    ".associates",
    ".auction",
    ".auto",
    ".baby",
    ".bar",
    ".bargains",
    ".beauty",
    ".beer",
    ".best",
    ".bike",
    ".bingo",
    ".black",
    ".blog",
    ".blue",
    ".bond",
    ".boutique",
    ".builders",
    ".cafe",
    ".capital",
    ".cash",
    ".cc",
    ".center",
    ".cfd",
    ".chat",
    ".church",
    ".cloud",
    ".coach",
    ".coffee",
    ".community",
    ".consulting",
    ".cool",
    ".dance",
    ".dating",
    ".dealer",
    ".deals",
    ".delivery",
    ".democrat",
    ".dental",
    ".diamonds",
    ".diet",
    ".direct",
    ".discount",
    ".dog",
    ".domains",
    ".education",
    ".energy",
    ".engineer",
    ".engineering",
    ".enterprises",
    ".equipment",
    ".estate",
    ".events",
    ".exchange",
    ".exposed",
    ".express",
    ".fail",
    ".family",
    ".fan",
    ".farm",
    ".fashion",
    ".finance",
    ".financial",
    ".fish",
    ".fishing",
    ".fit",
    ".fitness",
    ".flights",
    ".florist",
    ".football",
    ".forsale",
    ".foundation",
    ".fun",
    ".fund",
    ".furniture",
    ".futbol",
    ".fyi",
    ".gallery",
    ".game",
    ".games",
    ".garden",
    ".gifts",
    ".glass",
    ".gold",
    ".golf",
    ".graphics",
    ".gratis",
    ".gripe",
    ".group",
    ".guide",
    ".guitars",
    ".hair",
    ".haus",
    ".healthcare",
    ".hockey",
    ".holdings",
    ".holiday",
    ".homes",
    ".horse",
    ".host",
    ".hosting",
    ".house",
    ".how",
    ".icu",
    ".immo",
    ".immobilien",
    ".inc",
    ".industries",
    ".institute",
    ".insure",
    ".international",
    ".investments",
    ".jewelry",
    ".kaufen",
    ".kim",
    ".kitchen",
    ".land",
    ".lease",
    ".legal",
    ".lighting",
    ".limited",
    ".limo",
    ".live",
    ".loans",
    ".lol",
    ".ltd",
    ".maison",
    ".makeup",
    ".management",
    ".marketing",
    ".mba",
    ".media",
    ".memorial",
    ".moda",
    ".mom",
    ".money",
    ".movie",
    ".network",
    ".news",
    ".online",
    ".partners",
    ".parts",
    ".pet",
    ".photos",
    ".pics",
    ".pictures",
    ".pink",
    ".pizza",
    ".plumbing",
    ".plus",
    ".press",
    ".productions",
    ".promo",
    ".properties",
    ".quest",
    ".recipes",
    ".reisen",
    ".rent",
    ".rentals",
    ".repair",
    ".report",
    ".republican",
    ".rest",
    ".restaurant",
    ".reviews",
    ".rip",
    ".rodeo",
    ".run",
    ".sale",
    ".salon",
    ".schule",
    ".shop",
    ".shoes",
    ".show",
    ".site",
    ".ski",
    ".social",
    ".solar",
    ".studio",
    ".style",
    ".supply",
    ".support",
    ".surf",
    ".systems",
    ".tax",
    ".taxi",
    ".team",
    ".tech",
    ".technology",
    ".tel",
    ".tennis",
    ".theater",
    ".tienda",
    ".tires",
    ".tools",
    ".tours",
    ".town",
    ".toys",
    ".training",
    ".tv",
    ".university",
    ".uno",
    ".vacations",
    ".ventures",
    ".viajes",
    ".villas",
    ".vin",
    ".vip",
    ".vision",
    ".vodka",
    ".voyage",
    ".watch",
    ".wedding",
    ".wine",
    ".works",
    ".wtf",
    ".yoga",
    ".zone",
    ".accountant",
    ".airforce",
    ".app",
    ".army",
    ".attorney",
    ".autos",
    ".bet",
    ".bid",
    ".bio",
    ".blackfriday",
    ".boats",
    ".boo",
    ".boston",
    ".build",
    ".business",
    ".buzz",
    ".cab",
    ".cam",
    ".camera",
    ".camp",
    ".car",
    ".cards",
    ".care",
    ".careers",
    ".cars",
    ".casino",
    ".catering",
    ".ceo",
    ".charity",
    ".cheap",
    ".christmas",
    ".claims",
    ".cleaning",
    ".clinic",
    ".clothing",
    ".codes",
    ".college",
    ".computer",
    ".condos",
    ".construction",
    ".contact",
    ".contractors",
    ".cooking",
    ".coupons",
    ".credit",
    ".creditcard",
    ".cruises",
    ".cyou",
    ".dad",
    ".date",
    ".day",
    ".degree",
    ".dentist",
    ".desi",
    ".dev",
    ".doctor",
    ".download",
    ".eco",
    ".esq",
    ".faith",
    ".fans",
    ".fm",
    ".radio.fm",
    ".foo",
    ".forum",
    ".gay",
    ".gift",
    ".gives",
    ".giving",
    ".gmbh",
    ".green",
    ".hiphop",
    ".hospital",
    ".irish",
    ".jetzt",
    ".juegos",
    ".lawyer",
    ".lgbt",
    ".loan",
    ".love",
    ".luxury",
    ".men",
    ".miami",
    ".monster",
    ".mortgage",
    ".motorcycles",
    ".mov",
    ".navy",
    ".nexus",
    ".page",
    ".phd",
    ".photo",
    ".place",
    ".poker",
    ".prof",
    ".protection",
    ".pw",
    ".racing",
    ".realty",
    ".rehab",
    ".reise",
    ".review",
    ".rsvp",
    ".sarl",
    ".sbs",
    ".sex",
    ".sh",
    ".shiksha",
    ".shopping",
    ".singles",
    ".skin",
    ".soccer",
    ".software",
    ".soy",
    ".store",
    ".supplies",
    ".surgery",
    ".tattoo",
    ".trade",
    ".vet",
    ".vote",
    ".voto",
    ".wiki",
    ".win",
    ".yachts",
    ".zip",
    ".ai",
    ".com.ai",
    ".net.ai",
    ".org.ai",
    ".off.ai",
    ".archi",
    ".broker",
    ".country",
    ".cricket",
    ".cymru",
    ".diy",
    ".earth",
    ".food",
    ".forex",
    ".health",
    ".ing",
    ".ink",
    ".kids",
    ".la",
    ".lat",
    ".law",
    ".lifestyle",
    ".living",
    ".llc",
    ".luxe",
    ".markets",
    ".meme",
    ".moe",
    ".nagoya",
    ".ngo",
    ".observer",
    ".ong",
    ".onl",
    ".ooo",
    ".osaka",
    ".ph",
    ".com.ph",
    ".net.ph",
    ".org.ph",
    ".security",
    ".stream",
    ".sucks",
    ".sydney",
    ".theatre",
    ".tickets",
    ".trading",
    ".travel",
    ".tube",
    ".org.uk",
    ".me.uk",
    ".vana",
    ".wales",
    ".ws",
    ".yokohama",
    ".am",
    ".radio.am",
    ".basketball",
    ".bible",
    ".bot",
    ".bz",
    ".com.bz",
    ".net.bz",
    ".org.bz",
    ".co.bz",
    ".com.co",
    ".net.co",
    ".nom.co",
    ".courses",
    ".cx",
    ".fo",
    ".gg",
    ".net.gg",
    ".org.gg",
    ".co.gg",
    ".hiv",
    ".id",
    ".com.in",
    ".net.in",
    ".org.in",
    ".info.in",
    ".me.in",
    ".io.in",
    ".biz.in",
    ".co.in",
    ".us.in",
    ".uk.in",
    ".cn.in",
    ".pro.in",
    ".ca.in",
    ".firm.in",
    ".gen.in",
    ".ind.in",
    ".5g.in",
    ".6g.in",
    ".ai.in",
    ".am.in",
    ".bihar.in",
    ".business.in",
    ".coop.in",
    ".cs.in",
    ".delhi.in",
    ".dr.in",
    ".er.in",
    ".gujarat.in",
    ".int.in",
    ".internet.in",
    ".pg.in",
    ".post.in",
    ".travel.in",
    ".tv.in",
    ".up.in",
    ".kiwi",
    ".li",
    ".lotto",
    ".ltda",
    ".menu",
    ".com.mx",
    ".net.mx",
    ".org.mx",
    ".new",
    ".okinawa",
    ".organic",
    ".qpon",
    ".rich",
    ".rugby",
    ".spa",
    ".storage",
    ".study",
    ".vc",
    ".com.vc",
    ".net.vc",
    ".org.vc",
    ".voting",
    ".co.at",
    ".or.at",
    ".career",
    ".case",
    ".com.cn",
    ".net.cn",
    ".org.cn",
    ".cologne",
    ".co.com",
    ".us.com",
    ".uk.com",
    ".ru.com",
    ".de.com",
    ".cn.com",
    ".eu.com",
    ".br.com",
    ".it.com",
    ".gr.com",
    ".jpn.com",
    ".mex.com",
    ".sa.com",
    ".za.com",
    ".compare",
    ".com.de",
    ".feedback",
    ".film",
    ".gd",
    ".gdn",
    ".hamburg",
    ".je",
    ".net.je",
    ".org.je",
    ".co.je",
    ".koeln",
    ".kyoto",
    ".mn",
    ".uk.net",
    ".jp.net",
    ".in.net",
    ".se.net",
    ".gb.net",
    ".hu.net",
    ".nrw",
    ".net.nz",
    ".org.nz",
    ".co.nz",
    ".school.nz",
    ".ac.nz",
    ".geek.nz",
    ".gen.nz",
    ".health.nz",
    ".kiwi.nz",
    ".maori.nz",
    ".us.org",
    ".ae.org",
    ".realestate",
    ".ruhr",
    ".ryukyu",
    ".saarland",
    ".sc",
    ".com.sc",
    ".net.sc",
    ".org.sc",
    ".com.se",
    ".select",
    ".sg",
    ".com.sg",
    ".org.sg",
    ".so",
    ".com.so",
    ".net.so",
    ".org.so",
    ".srl",
    ".vg",
    ".watches",
    ".wien",
    ".みんな",
    ".企业",
    ".商店",
    ".娱乐",
    ".游戏",
    ".移动",
    ".网站",
    ".0db",
    ".0z",
    ".1",
    ".1d",
    ".1q",
    ".247",
    ".35",
    ".3dom",
    ".49",
    ".4free",
    ".4k",
    ".4sale",
    ".4you",
    ".80proof",
    ".8888",
    ".8s",
    ".abo",
    ".abogado",
    ".aboutme",
    ".aby",
    ".aca",
    ".addme",
    ".adlt",
    ".advisor",
    ".afam",
    ".africa",
    ".afz",
    ".ag",
    ".com.ag",
    ".net.ag",
    ".org.ag",
    ".co.ag",
    ".nom.ag",
    ".ags",
    ".agua",
    ".ahoy",
    ".aj",
    ".albums",
    ".alto",
    ".amg",
    ".amigo",
    ".amor",
    ".ane",
    ".annex",
    ".aotearoa",
    ".apartment",
    ".api",
    ".arbitrator",
    ".artesanal",
    ".articles",
    ".artificial",
    ".assurances",
    ".atc",
    ".ath",
    ".atwork",
    ".com.au",
    ".net.au",
    ".org.au",
    ".augmented",
    ".b2b",
    ".baas",
    ".badly",
    ".bakes",
    ".batch",
    ".beach",
    ".beef",
    ".bem",
    ".bh",
    ".bi",
    ".biometric",
    ".bitcoinfund",
    ".bizdata",
    ".bizdev",
    ".blockchaindapps",
    ".blogging",
    ".bmp",
    ".bob",
    ".bog",
    ".booked",
    ".boredapes",
    ".bqw",
    ".brand",
    ".brewery",
    ".brokers",
    ".browsers",
    ".btk9",
    ".btt",
    ".buddhist",
    ".buyaflat",
    ".byn",
    ".c",
    ".c0m",
    ".c4",
    ".cabins",
    ".cardcollector",
    ".cares",
    ".catgirl",
    ".causes",
    ".cerrajero",
    ".cheddar",
    ".cism",
    ".cita",
    ".citizenship",
    ".ckq",
    ".clc",
    ".clic",
    ".client",
    ".clients",
    ".cliq",
    ".cloudbot",
    ".cm",
    ".cm3",
    ".cn3",
    ".co3",
    ".co_com",
    ".co_in",
    ".co_uk",
    ".codeschool",
    ".coffees",
    ".coinnet",
    ".com_co",
    ".comic",
    ".comics",
    ".commerce",
    ".communion",
    ".complete",
    ".computers",
    ".concise",
    ".conduct",
    ".conductor",
    ".conf",
    ".connectors",
    ".connoisseur",
    ".consultancy",
    ".cork",
    ".corporation",
    ".crazy",
    ".creations",
    ".creativity",
    ".creator",
    ".crew",
    ".croatia",
    ".cryp",
    ".cryptobets",
    ".cryptogamer",
    ".cryptoservice",
    ".cuba",
    ".cycle",
    ".cyprus",
    ".d5",
    ".d8",
    ".dais",
    ".damn",
    ".dan",
    ".datamining",
    ".daytrade",
    ".dco",
    ".de3",
    ".dean",
    ".debtless",
    ".decent",
    ".decentralize",
    ".defi",
    ".deficit",
    ".degen",
    ".den",
    ".detour",
    ".development",
    ".dg",
    ".dh",
    ".dids",
    ".digitalasset",
    ".dilate",
    ".directive",
    ".discounts",
    ".discussion",
    ".diva",
    ".dlt",
    ".dly",
    ".doge",
    ".dogecoin",
    ".dojo",
    ".dolls",
    ".doma",
    ".dookie",
    ".douchebag",
    ".down",
    ".downloads",
    ".ds",
    ".ducktape",
    ".duration",
    ".dvd",
    ".dweb",
    ".dweb3",
    ".dy",
    ".eathere",
    ".ec",
    ".com.ec",
    ".net.ec",
    ".info.ec",
    ".pub.ec",
    ".adm.ec",
    ".art.ec",
    ".bar.ec",
    ".cue.ec",
    ".disco.ec",
    ".doc.ec",
    ".fot.ec",
    ".gye.ec",
    ".k12.ec",
    ".rrpp.ec",
    ".tech.ec",
    ".tur.ec",
    ".uio.ec",
    ".economics",
    ".economy",
    ".edm",
    ".egame",
    ".elect",
    ".electronics",
    ".elite",
    ".emj",
    ".engaged",
    ".ep",
    ".eporn",
    ".ero",
    ".com.es",
    ".org.es",
    ".nom.es",
    ".estates",
    ".eternity",
    ".etickets",
    ".event",
    ".ewallet",
    ".ewx",
    ".executive",
    ".ext",
    ".exu",
    ".eyecare",
    ".ez",
    ".fak",
    ".fam",
    ".faqs",
    ".fcb",
    ".fd",
    ".fe",
    ".feeling",
    ".fej",
    ".fellowship",
    ".ffa",
    ".fgz",
    ".fia",
    ".fiat2btc",
    ".fiji",
    ".filters",
    ".financialnews",
    ".findme",
    ".firstname",
    ".fl3x",
    ".flap",
    ".flat",
    ".fmw",
    ".follow",
    ".foot",
    ".forall",
    ".fore",
    ".freebies",
    ".fua",
    ".fundraising",
    ".fw",
    ".fwd",
    ".gad",
    ".gadget",
    ".gdl",
    ".ger",
    ".gethigh",
    ".getreal",
    ".getwell",
    ".gic",
    ".gin",
    ".giveaways",
    ".gl",
    ".gofor",
    ".gon",
    ".gonow",
    ".goth",
    ".grandmaster",
    ".greatoffers",
    ".grow",
    ".gruppen",
    ".guey",
    ".guidance",
    ".guz",
    ".gvz",
    ".gyc",
    ".gzp",
    ".hack",
    ".hackathon",
    ".hae",
    ".hah",
    ".haiti",
    ".hardrive",
    ".hb",
    ".heh",
    ".hell",
    ".helpdesk",
    ".hem",
    ".hermanos",
    ".hf",
    ".hgo",
    ".hill",
    ".hire",
    ".hits",
    ".hk",
    ".hn",
    ".hodlr",
    ".holding",
    ".holidayrental",
    ".holidays",
    ".hometown",
    ".horny",
    ".hotelguide",
    ".hpp",
    ".hsu",
    ".hx",
    ".i1",
    ".ib",
    ".ibn",
    ".ieh",
    ".ifv",
    ".ih",
    ".ik",
    ".ill",
    ".iloveu",
    ".im",
    ".com.im",
    ".net.im",
    ".org.im",
    ".co.im",
    ".in_net",
    ".income",
    ".influencer",
    ".information",
    ".inh",
    ".innovator",
    ".interest",
    ".intro",
    ".iny",
    ".ioi",
    ".ioo",
    ".is",
    ".island",
    ".ism",
    ".isthefuture",
    ".italy",
    ".iuh",
    ".iurl",
    ".iw",
    ".ize",
    ".ja",
    ".january",
    ".jao",
    ".jeh",
    ".jf",
    ".job",
    ".jok",
    ".joker",
    ".jov",
    ".jpg",
    ".jpgs",
    ".js",
    ".jub",
    ".jugar",
    ".jun",
    ".jy",
    ".kcx",
    ".kennel",
    ".keys",
    ".kf",
    ".kicks",
    ".kinetic",
    ".kip",
    ".kj",
    ".kl",
    ".knight",
    ".knowledge",
    ".kq",
    ".krd",
    ".ks",
    ".kv",
    ".l33t",
    ".lars",
    ".lausanne",
    ".lawexpert",
    ".lawoffice",
    ".lawsuit",
    ".lc",
    ".com.lc",
    ".net.lc",
    ".org.lc",
    ".l.lc",
    ".p.lc",
    ".lean",
    ".legendary",
    ".likeapro",
    ".lingo",
    ".livestreaming",
    ".ljb",
    ".lli",
    ".lnx",
    ".lo",
    ".logo",
    ".lord",
    ".lov",
    ".lovesyou",
    ".lt",
    ".com.lv",
    ".net.lv",
    ".org.lv",
    ".asn.lv",
    ".conf.lv",
    ".id.lv",
    ".lw",
    ".lyf",
    ".lz",
    ".maestro",
    ".magazine",
    ".mansion",
    ".me_uk",
    ".mediator",
    ".medico",
    ".mee",
    ".ment",
    ".merc",
    ".mev",
    ".mg",
    ".micro",
    ".mined",
    ".mission",
    ".mke",
    ".moar",
    ".mommy",
    ".montage",
    ".mooning",
    ".motherboard",
    ".mtl",
    ".mvo",
    ".mwallet",
    ".my",
    ".com.my",
    ".mycard",
    ".myco",
    ".myo",
    ".myproxy",
    ".myurl",
    ".nah",
    ".napavalley",
    ".nearme",
    ".neo",
    ".nerdy",
    ".nftcartel",
    ".nfts",
    ".nil",
    ".nod",
    ".nom",
    ".notes",
    ".nouns",
    ".npm",
    ".nuk",
    ".numb",
    ".nxs",
    ".nym",
    ".ob",
    ".od",
    ".oda",
    ".oflinewallet",
    ".often",
    ".oh",
    ".ohmy",
    ".oin",
    ".oncam",
    ".onewallet",
    ".onlinenews",
    ".oo",
    ".oof",
    ".oot",
    ".optimize",
    ".oq",
    ".orb",
    ".org_uk",
    ".oslo",
    ".ot",
    ".oun",
    ".owbo",
    ".p",
    ".paid",
    ".pal",
    ".pave",
    ".pdcst",
    ".pe",
    ".com.pe",
    ".net.pe",
    ".org.pe",
    ".performer",
    ".pest",
    ".pgp",
    ".picture",
    ".pier",
    ".pix",
    ".piz",
    ".com.pl",
    ".net.pl",
    ".org.pl",
    ".info.pl",
    ".biz.pl",
    ".places",
    ".plaza",
    ".ply",
    ".pockets",
    ".poj",
    ".policeman",
    ".ppp",
    ".pr",
    ".com.pr",
    ".net.pr",
    ".org.pr",
    ".info.pr",
    ".biz.pr",
    ".name.pr",
    ".pro.pr",
    ".isla.pr",
    ".praha",
    ".premio",
    ".premium",
    ".presenter",
    ".prices",
    ".prodazha",
    ".profiles",
    ".project",
    ".pui",
    ".pun",
    ".pv",
    ".pz",
    ".qa",
    ".qd",
    ".qf",
    ".qg",
    ".qh",
    ".qk",
    ".qn",
    ".qo",
    ".quebec",
    ".queens",
    ".qum",
    ".qy",
    ".radio",
    ".rekt",
    ".remember",
    ".researcher",
    ".resources",
    ".rh",
    ".rican",
    ".rl",
    ".rn",
    ".ro",
    ".rogan",
    ".row",
    ".rpgs",
    ".rumor",
    ".runs",
    ".rural",
    ".russo",
    ".rust",
    ".rz",
    ".saas",
    ".sales",
    ".samples",
    ".sats",
    ".say",
    ".schooling",
    ".scot",
    ".sds",
    ".secrets",
    ".semi",
    ".sexblog",
    ".sharing",
    ".shark",
    ".shizzle",
    ".shoppingcart",
    ".shortcut",
    ".shot",
    ".shp",
    ".sig",
    ".simp",
    ".simplicity",
    ".sniff",
    ".solution",
    ".sos",
    ".southafrican",
    ".sox",
    ".spac",
    ".specs",
    ".sport",
    ".squirtfiesta",
    ".src",
    ".ssl",
    ".startup",
    ".streamer",
    ".substack",
    ".supreme",
    ".sus",
    ".swapz",
    ".sx",
    ".taipei",
    ".tao",
    ".tar",
    ".taxfree",
    ".techblog",
    ".teck",
    ".teenager",
    ".teepee",
    ".tefi",
    ".ter",
    ".thenerd",
    ".tirol",
    ".tni",
    ".to",
    ".token",
    ".trader",
    ".trans",
    ".trekking",
    ".tricks",
    ".troll",
    ".tuber",
    ".turtles",
    ".tutorial",
    ".com.tw",
    ".net.tw",
    ".org.tw",
    ".club.tw",
    ".ebiz.tw",
    ".game.tw",
    ".idv.tw",
    ".tx",
    ".u2",
    ".ud",
    ".ue",
    ".uf",
    ".uge",
    ".uk3",
    ".ultimate",
    ".umo",
    ".underground",
    ".underworld",
    ".unit",
    ".universe",
    ".unlock",
    ".us3",
    ".use",
    ".uui",
    ".uzr",
    ".valley",
    ".vase",
    ".versicherung",
    ".vie",
    ".viewer",
    ".visit",
    ".vj",
    ".vlog",
    ".voice",
    ".vq",
    ".vuo",
    ".w33d",
    ".w3b",
    ".w3n",
    ".w8",
    ".wasabi",
    ".wave",
    ".wc",
    ".we3",
    ".web4",
    ".webartist",
    ".webdesigner",
    ".websites",
    ".wh",
    ".whitepaper",
    ".wj",
    ".wl",
    ".won",
    ".worldtour",
    ".wq",
    ".wr",
    ".wt",
    ".x00m",
    ".x2",
    ".xa",
    ".xb",
    ".xc",
    ".xcam",
    ".xf",
    ".xg",
    ".xi",
    ".xk",
    ".xn--5o8h",
    ".xn--6ca",
    ".xn--6frz82g",
    ".xn--dei",
    ".xn--dp8h",
    ".xn--e77hhb",
    ".xn--g6h",
    ".xn--pei",
    ".xn--rci",
    ".xq",
    ".xr",
    ".xxxx",
    ".yb",
    ".yd",
    ".year",
    ".yh",
    ".yj",
    ".yo",
    ".yol",
    ".yolo",
    ".yq",
    ".yummy",
    ".yx",
    ".yzx",
    ".co.za",
    ".zc",
    ".zen",
    ".zh",
    ".zoy",
    ".zp",
    ".zs",
    ".zug",
    ".zx",
    ".zy",
    ".ευ",
    ".ею",
    ".москва",
    ".онлайн",
    ".орг",
    ".рус",
    ".сайт",
    ".קום",
    ".بازار",
    ".بھارت",
    ".شبكة",
    ".भारत",
    ".कंपनी.भारत",
    ".संगठन",
    ".ভারত",
    ".ਭਾਰਤ",
    ".ભારત",
    ".இந்தியா",
    ".భారత్",
    ".コム",
    ".世界",
    ".中国",
    ".中文网",
    ".公司",
    ".在线",
    ".机构",
    ".网络",
    ".닷넷",
    ".닷컴"
];


tlds.sort((a, b) => b.split('.').length - a.split('.').length)

export default tlds;

export const tlds_regex = tlds.map( tld => new RegExp(`${tld.replaceAll('.', '\\.')}$`, 'i') );