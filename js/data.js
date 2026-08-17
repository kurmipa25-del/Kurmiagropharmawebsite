// DR. KURMI'S PHARMAGRO LLP - Central Data Repository

const COMPANY_INFO = {
    name: "Dr. Kurmi's Pharmagro LLP",
    shortName: "Dr. Kurmi's Pharmagro",
    profileCode: "KP / 001",
    tagline: "Quality-Focused Sourcing & Reliable Product Partnerships",
    description: "DR. KURMI'S PHARMAGRO LLP is an Indian pharmaceutical and healthcare company focused on B2C consumer care and commercial products for consumers, distributors, institutions and business partners. We aim to build reliable product partnerships through quality-focused sourcing, professional service and responsible business practices, with a long-term vision for domestic and international markets.",
    phone: "+91 73043 40591",
    whatsapp: "+91 73043 40591",
    whatsappLink: "https://wa.me/917304340591",
    email: "info@kurmipharmagro.in",
    origin: "Borivali East, Mumbai, India",
    address: "Shop no.3, Uttam Villa, Road no. 10, Daulat Nagar, Borivali East, Mumbai - 400066",
    segments: "B2C Consumer Care · Commercial Products",
    servesConsumers: "Consumers & Distributors",
    servesInstitutions: "Institutions & Partners",
    marketVision: "Domestic + International",
    certifications: ["WHO-GMP Sourced Facilities", "ISO 9001:2015 Certified Partner Network", "FSSAI Registered", "CDSCO Compliant Sourcing"]
};

const STATS_DATA = [
    { value: 30, suffix: "+", label: "Years of Experience" },
    { value: "PAN India", suffix: "", label: "Coverage & Network" },
    { value: 25, suffix: "+", label: "WHO-GMP Partner Facilities" },
    { value: 99.8, suffix: "%", label: "Quality Pass Standard" }
];

const CATEGORIES = [
    { id: "all", name: "All Portfolios", icon: "bi-grid-fill" },
    { id: "b2c", name: "B2C Consumer Care", icon: "bi-bag-heart-fill" },
    { id: "commercial", name: "Commercial Products", icon: "bi-box-seam-fill" }
];

const PRODUCTS_DATA = [
    {
        id: "KP-B2C-01",
        name: "K-PANITIS CREAM",
        image: "assets/k_panitis.png",
        category: "b2c",
        categoryName: "Ayurvedic Medicine",
        dosageForm: "Topical Cream",
        composition: "Ayurvedic Herbal Pain Relief Formulation",
        therapeuticCategory: "Musculoskeletal & Pain Relief",
        packaging: "30 g Tube",
        certification: "Ayush Compliant & Quality Assured",
        description: "Ayurvedic herbal cream formulated for soothing relief from muscle and joint discomfort.",
        indications: "Sprains, strains, muscle pain, joint pain & sports-related stiffness.",
        directions: "Apply to the affected area and gently massage 2–3 times daily or as directed. For external use only.",
        badge: "Ayurvedic Cream",
        isPopular: true
    },
    {
        id: "KP-B2C-02",
        name: "K-VION Vitamin E 400 IU",
        image: "assets/k_vion.jpg",
        category: "b2c",
        categoryName: "Nutraceutical / Health Supplement",
        dosageForm: "Softgel Capsules",
        composition: "Vitamin E 400 IU",
        therapeuticCategory: "Skin, Hair & Antioxidant Protection",
        packaging: "10 × 10 Softgel Capsules",
        certification: "FSSAI Registered & ISO 22000",
        description: "Vitamin E 400 IU supplement formulated to support skin health, hair health, hydration and antioxidant protection.",
        indications: "Skin hydration, hair nourishment, and antioxidant support.",
        keyBenefits: [
            "Supports healthy skin",
            "Supports hair health",
            "Helps maintain skin hydration",
            "Provides antioxidant support"
        ],
        directions: "Take 1 softgel capsule daily or as directed by a healthcare professional.",
        storage: "Store in a cool, dry and dark place below 25°C.",
        badge: "Skin & Hair Support",
        isPopular: true
    },
    {
        id: "KP-B2C-03",
        name: "K-D3 CAL Vitamin D3 60,000 IU",
        image: "assets/k_d3.jpg",
        category: "b2c",
        categoryName: "Nutraceutical / Health Supplement",
        dosageForm: "Softgel Capsules",
        composition: "Cholecalciferol (Vitamin D3) 60,000 IU",
        therapeuticCategory: "Bone Health & Vitamin D Supplement",
        packaging: "10 × 1 × 4 Softgel Capsules",
        certification: "FSSAI Registered & ISO 22000",
        description: "Vitamin D3 supplement formulated to support bone health, calcium absorption and overall vitamin D levels.",
        indications: "Bone & teeth support, calcium absorption, muscle function.",
        keyBenefits: [
            "Supports strong bones & teeth",
            "Helps calcium absorption",
            "Supports muscle function",
            "Helps maintain healthy vitamin D levels"
        ],
        directions: "Take 1 softgel capsule daily or as directed by a healthcare professional.",
        storage: "Store in a cool, dry and dark place below 25°C.",
        badge: "Vitamin D3 60K",
        isPopular: true
    },
    {
        id: "KP-COM-01",
        name: "K-Triaxone 1 g Injection",
        image: "assets/k_triaxone.png",
        category: "commercial",
        categoryName: "Commercial Products",
        dosageForm: "Injection (Vial)",
        composition: "Ceftriaxone Sodium IP equivalent to Ceftriaxone 1000 mg",
        therapeuticCategory: "Antibiotic & Anti-Infective Injection",
        packaging: "1 g Vial",
        certification: "WHO-GMP Sterile Facility",
        description: "Ceftriaxone antibiotic injection used for the treatment of bacterial infections.",
        indications: "Respiratory, urinary tract, skin & soft-tissue and other susceptible bacterial infections.",
        directions: "For IM/IV use only, as directed by a qualified physician.",
        storage: "Store below 25°C and protect from direct light & moisture.",
        badge: "Antibiotic Injection",
        isPopular: true
    },
    {
        id: "KP-COM-02",
        name: "K-B12 PFS 1500",
        image: "assets/k_b12.png",
        category: "commercial",
        categoryName: "Commercial Products",
        dosageForm: "Pre-Filled Syringe (PFS)",
        composition: "Mecobalamin 1500 mcg/ml",
        therapeuticCategory: "Vitamin B12 & Neurotropic Injection",
        packaging: "1 ml PFS",
        certification: "WHO-GMP Sterile Facility",
        description: "Mecobalamin injection formulated to support vitamin B12 supplementation and nerve health.",
        indications: "Vitamin B12 deficiency, peripheral neuropathy and related neurological conditions.",
        directions: "For IM/IV/Subcutaneous use, as directed by a qualified physician.",
        storage: "Store below 25°C and protect from light.",
        badge: "Ready-to-Use PFS",
        isPopular: true
    }
];

const SERVICES_ADVANTAGES = [
    {
        icon: "bi-check-circle-fill",
        title: "Quality-Focused Sourcing",
        desc: "We exclusively collaborate with WHO-GMP and ISO certified manufacturing facilities, implementing multi-tier quality audits and CoA verification."
    },
    {
        icon: "bi-briefcase-fill",
        title: "Professional Service & Support",
        desc: "Dedicated account managers for institutional buyers, distributors, and bulk partners with streamlined order management and transparent dispatch tracking."
    },
    {
        icon: "bi-shield-check",
        title: "Responsible Business Practices",
        desc: "Strict adherence to CDSCO guidelines, ethical pricing, complete batch traceability, and compliance documentation support."
    },
    {
        icon: "bi-globe-central-south-asia",
        title: "Domestic & Global Reach",
        desc: "Robust supply network across Indian domestic states and strategic readiness for international pharmaceutical & nutraceutical exports."
    }
];

const QUALITY_PILLARS = [
    {
        step: "01",
        title: "Partner Facility Audits",
        desc: "Comprehensive evaluation of manufacturing sites for WHO-GMP, ISO, and cleanroom standards."
    },
    {
        step: "02",
        title: "Raw Material & API Traceability",
        desc: "Verifying high-grade APIs and bio-available extracts with certificate of analysis (CoA) validation."
    },
    {
        step: "03",
        title: "Stability & Packaging Testing",
        desc: "Alu-Alu and moisture-barrier packaging integrity checks for tropical climatic stability."
    },
    {
        step: "04",
        title: "Regulatory Compliance Support",
        desc: "Complete documentation support including Dossiers, FSC, and Product COPP for international trade."
    }
];

const LEADERSHIP_DATA = [
    {
        id: "dinesh-kurmi",
        name: "Cpt. Dr. Dinesh Kurmi",
        role: "Founder & Chairman",
        credentials: "30+ Years in Clinical Surgical Practice",
        designation: "Founder & Chairman, Dr. Kurmi's Pharmagro LLP",
        bio: "The backbone of Dr. Kurmi's Pharmagro, Dr. Dinesh Kurmi brings three decades of hands-on medical experience to the company's direction. He is also the founder of Borivali Surgical Hospital, giving the company a rare, direct line between clinical practice and product decision-making.",
        highlights: [
            "30+ years of surgical & clinical experience",
            "Founder, Borivali Surgical Hospital",
            "Sets the company's quality & ethics standard"
        ],
        image: "assets/dr_dinesh_kurmi.png",
        icon: "bi-heart-pulse-fill",
        badgeColor: "#0096c7"
    },
    {
        id: "hrishikesh-kurmi",
        name: "Hrishikesh Kurmi",
        role: "Director",
        credentials: "B.Sc. Microbiology | Adv. Dip. International Trade & Supply Chain",
        designation: "Director, Dr. Kurmi's Pharmagro LLP",
        bio: "Hrishikesh Kurmi holds a B.Sc. in Microbiology, Advance Diploma in International Trade, and Advance Diploma in Logistics and Supply Chain Management. He leads the science-driven, commercial and supply chain operations — connecting formulation science, global trade logistics, and business expansion.",
        highlights: [
            "B.Sc. in Microbiology",
            "Advance Diploma in International Trade",
            "Advance Diploma in Logistics & Supply Chain Management",
            "Leads product innovation & supply chain strategy"
        ],
        image: "assets/hrishikesh_kurmi.jpg",
        icon: "bi-capsule-pill",
        badgeColor: "#10b981"
    }
];

