// KURMI PHARMAGRO LLP - Application Core Logic

let activeCategory = "all";
let currentSearchTerm = "";
let selectedProductForRFQ = null;

document.addEventListener("DOMContentLoaded", () => {
    initStats();
    initServices();
    initLeadership();
    initCategoryTabs();
    initProducts();
    initQualityPillars();
    initNavigation();
    initSearch();
});

// Render Stats Counters
function initStats() {
    const container = document.getElementById("statsGrid");
    if (!container) return;

    container.innerHTML = STATS_DATA.map(stat => `
        <div class="stat-card">
            <div class="stat-number">${stat.value}${stat.suffix ? `<span>${stat.suffix}</span>` : ''}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join("");
}

// Render Services / Advantages
function initServices() {
    const container = document.getElementById("servicesGrid");
    if (!container) return;

    container.innerHTML = SERVICES_ADVANTAGES.map(srv => `
        <div class="service-card">
            <div class="service-icon">
                <i class="bi ${srv.icon}"></i>
            </div>
            <h3>${srv.title}</h3>
            <p>${srv.desc}</p>
        </div>
    `).join("");
}

// Render Category Filter Tabs
function initCategoryTabs() {
    const container = document.getElementById("categoryTabs");
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
        <button class="tab-btn ${cat.id === activeCategory ? 'active' : ''}" onclick="switchCategory('${cat.id}')">
            <i class="bi ${cat.icon}"></i> ${cat.name}
        </button>
    `).join("");
}

// Switch Category Filter
function switchCategory(catId) {
    activeCategory = catId;
    initCategoryTabs();
    initProducts();
}

// Search Bar Realtime Filter
function initSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    input.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        initProducts();
    });
}

// Render Products Grid
function initProducts() {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    let filtered = PRODUCTS_DATA.filter(prod => {
        const matchesCategory = (activeCategory === "all") || (prod.category === activeCategory);
        const matchesSearch = !currentSearchTerm || 
            prod.name.toLowerCase().includes(currentSearchTerm) ||
            prod.composition.toLowerCase().includes(currentSearchTerm) ||
            prod.therapeuticCategory.toLowerCase().includes(currentSearchTerm);
        
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px;">
                <i class="bi bi-search-heart" style="font-size: 3rem; color: var(--primary);"></i>
                <h3 style="margin-top: 16px;">No Matching Formulations Found</h3>
                <p style="color: var(--text-muted); max-width: 460px; margin: 8px auto 20px;">
                    We could not find products matching "${currentSearchTerm}". Contact our trade desk directly for custom formulation inquiries.
                </p>
                <button class="btn btn-primary" onclick="openRFQModal()">Submit Custom Inquiry</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(prod => `
        <div class="product-card">
            ${prod.image ? `
            <div class="product-card-image">
                <img src="${prod.image}" alt="${prod.name}" loading="lazy">
            </div>
            ` : ''}
            <div class="product-card-header">
                <span class="product-category-badge">${prod.categoryName}</span>
                ${prod.isPopular ? '<span class="product-tag-popular"><i class="bi bi-star-fill"></i> Highlight</span>' : ''}
            </div>

            <div class="product-card-body">
                <div class="product-code">${prod.id}</div>
                <h3 class="product-title">${prod.name}</h3>

                <div class="product-meta">
                    <div class="meta-item">
                        <span class="meta-label">Form:</span>
                        <span class="meta-val">${prod.dosageForm}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Composition:</span>
                        <span class="meta-val" style="font-weight: 500;">${prod.composition}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Therapeutic:</span>
                        <span class="meta-val">${prod.therapeuticCategory}</span>
                    </div>
                </div>

                <p class="product-desc">${prod.description}</p>
            </div>

            <div class="product-card-footer">
                <div class="product-cert">
                    <i class="bi bi-patch-check-fill"></i> ${prod.certification}
                </div>
                <button class="btn btn-outline btn-sm" onclick="openProductModal('${prod.id}')">
                    Details <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join("");
}

// Render Quality Pillars
function initQualityPillars() {
    const container = document.getElementById("pillarsList");
    if (!container) return;

    container.innerHTML = QUALITY_PILLARS.map(p => `
        <div class="pillar-card">
            <div class="pillar-num">${p.step}</div>
            <div class="pillar-info">
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        </div>
    `).join("");
}

// Mobile Toggle & Navigation
function initNavigation() {
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Smooth active link highlighting
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            if (navMenu) navMenu.classList.remove("active");
        });
    });
}

// Product Details Modal
function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    selectedProductForRFQ = product.name;

    document.getElementById("modalTitle").innerText = `${product.name} (${product.id})`;
    
    const body = document.getElementById("modalBody");
    body.innerHTML = `
        ${product.image ? `
        <div style="width: 100%; background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%); border-radius: 12px; padding: 24px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 260px; object-fit: contain; filter: drop-shadow(0 6px 20px rgba(0,0,0,0.1));">
        </div>
        ` : ''}
        <div style="margin-bottom: 20px;">
            <span class="product-category-badge">${product.categoryName}</span>
            <span class="product-tag-popular" style="margin-left: 10px;">${product.badge}</span>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Active Ingredients & Composition</h4>
            <p style="font-size: 1.1rem; font-weight: 600; color: var(--navy-bg);">${product.composition}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
                <strong style="font-size: 0.85rem; color: var(--text-muted); display: block;">Dosage Form</strong>
                <span style="font-size: 0.95rem; font-weight: 600;">${product.dosageForm}</span>
            </div>
            <div>
                <strong style="font-size: 0.85rem; color: var(--text-muted); display: block;">Packaging Format</strong>
                <span style="font-size: 0.95rem; font-weight: 600;">${product.packaging}</span>
            </div>
            <div>
                <strong style="font-size: 0.85rem; color: var(--text-muted); display: block;">Therapeutic Class</strong>
                <span style="font-size: 0.95rem; font-weight: 600;">${product.therapeuticCategory}</span>
            </div>
            <div>
                <strong style="font-size: 0.85rem; color: var(--text-muted); display: block;">Compliance Standard</strong>
                <span style="font-size: 0.95rem; font-weight: 600; color: var(--accent-emerald-dark);"><i class="bi bi-shield-check"></i> ${product.certification}</span>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="font-size: 1rem; margin-bottom: 8px;">Product Overview</h4>
            <p style="color: var(--text-body); font-size: 0.95rem; line-height: 1.6;">${product.description}</p>
        </div>

        ${product.keyBenefits ? `
        <div style="margin-bottom: 20px;">
            <h4 style="font-size: 1rem; margin-bottom: 8px;">Key Benefits</h4>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px;">
                ${product.keyBenefits.map(b => `<li style="font-size: 0.93rem; display: flex; align-items: center; gap: 8px; color: var(--text-body);"><i class="bi bi-check-circle-fill" style="color: var(--accent-emerald);"></i> ${b}</li>`).join("")}
            </ul>
        </div>
        ` : ''}

        <div style="margin-bottom: 20px;">
            <h4 style="font-size: 1rem; margin-bottom: 8px;">Primary Indications & Applications</h4>
            <p style="color: var(--text-body); font-size: 0.95rem; background: #eff6ff; padding: 12px 16px; border-radius: 8px; border-left: 4px solid var(--primary);">${product.indications}</p>
        </div>

        ${product.directions ? `
        <div style="margin-bottom: 16px;">
            <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 4px;"><i class="bi bi-info-circle-fill" style="color: var(--primary);"></i> Directions for Use</h4>
            <p style="color: var(--text-body); font-size: 0.92rem; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">${product.directions}</p>
        </div>
        ` : ''}

        ${product.storage ? `
        <div style="margin-bottom: 16px;">
            <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 4px;"><i class="bi bi-box-seam" style="color: var(--primary);"></i> Storage Instructions</h4>
            <p style="color: var(--text-body); font-size: 0.92rem; background: #fff8f0; padding: 10px 14px; border-radius: 8px; border: 1px solid #fed7aa; color: #9a3412;">${product.storage}</p>
        </div>
        ` : ''}
    `;

    document.getElementById("productModal").classList.add("active");
}

function triggerRFQFromModal() {
    closeModal('productModal');
    openRFQModal(selectedProductForRFQ);
}

// RFQ Modal
function openRFQModal(productName = '') {
    const input = document.getElementById("rfqProductName");
    if (input) {
        input.value = productName || "All Portfolios / General Inquiry";
    }
    document.getElementById("rfqModal").classList.add("active");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

// Toast Notifications
function showToast(title, message) {
    const toast = document.getElementById("toastMsg");
    document.getElementById("toastTitle").innerText = title;
    document.getElementById("toastDesc").innerText = message;

    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4500);
}

// Form Handlers — EmailJS Integration
// Service ID: service_04fnfch
// B2B Template: template_klv1oog | RFQ Template: template_4z7ohg7
// Target: info@kurmipharmagro.in
function handleFormSubmit(event, formType) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

    let templateId, templateParams;

    if (formType === 'B2B Quick Inquiry') {
        const name     = document.getElementById('b2bName').value.trim();
        const bizType  = document.getElementById('b2bBusinessType').value;
        const email    = document.getElementById('b2bEmail').value.trim();
        const phone    = document.getElementById('b2bPhone').value.trim();
        const products = document.getElementById('b2bProducts').value.trim() || 'Not specified';

        templateId = 'template_klv10og';
        templateParams = {
            from_name:  name,
            from_email: email,
            reply_to:   email,
            to_name:    'KURMI PHARMAGRO Team',
            message:
                `B2B QUICK INQUIRY — KURMI PHARMAGRO\n` +
                `${'='.repeat(40)}\n\n` +
                `Name / Entity   : ${name}\n` +
                `Business Type   : ${bizType}\n` +
                `Email           : ${email}\n` +
                `Phone / WhatsApp: ${phone}\n` +
                `Products Wanted : ${products}\n\n` +
                `Submitted via: kurmipharmagro.in`
        };

    } else if (formType === 'Formal Product Quote') {
        const product       = document.getElementById('rfqProductName').value.trim() || 'All Portfolios';
        const quantity      = document.getElementById('rfqQuantity').value.trim();
        const company       = document.getElementById('rfqCompany').value.trim();
        const contactPerson = document.getElementById('rfqContactPerson').value.trim();
        const email         = document.getElementById('rfqEmail').value.trim();
        const phoneInput    = document.getElementById('rfqPhone');
        const phone         = phoneInput ? phoneInput.value.trim() : 'Not specified';
        const location      = document.getElementById('rfqLocation').value.trim() || 'Not specified';

        templateId = 'template_4z7ohg7';
        templateParams = {
            from_name:  contactPerson,
            from_email: email,
            reply_to:   email,
            to_name:    'KURMI PHARMAGRO Team',
            message:
                `FORMAL PRODUCT QUOTE (RFQ) — KURMI PHARMAGRO\n` +
                `${'='.repeat(40)}\n\n` +
                `Product / Formulation : ${product}\n` +
                `Estimated Quantity    : ${quantity}\n` +
                `Company / Entity      : ${company}\n` +
                `Contact Person        : ${contactPerson}\n` +
                `Email                 : ${email}\n` +
                `Phone / WhatsApp      : ${phone}\n` +
                `Delivery Location     : ${location}\n\n` +
                `Submitted via: kurmipharmagro.in`
        };
    }

    function sendEmailWithTemplate(tid) {
        return emailjs.send('service_04fnfch', tid, templateParams, '-Uwfciv5I290o0EOi');
    }

    sendEmailWithTemplate(templateId)
        .catch((error) => {
            // Automatic fallbacks for 'o' vs '0' in template IDs
            if (error && error.status === 400) {
                if (templateId === 'template_4z7ohg7') return sendEmailWithTemplate('template_4z70hg7');
                if (templateId === 'template_4z70hg7') return sendEmailWithTemplate('template_4z7ohg7');
                if (templateId === 'template_klv10og') return sendEmailWithTemplate('template_klv1oog');
                if (templateId === 'template_klv1oog') return sendEmailWithTemplate('template_klv10og');
            }
            throw error;
        })
        .then((res) => {
            console.log('EmailJS Success:', res);
            showToast(
                "✅ Inquiry Sent!",
                `Your ${formType} has been delivered to our team at info@kurmipharmagro.in. We'll respond within 24 hours.`
            );
            form.reset();
            if (document.getElementById("rfqModal").classList.contains("active")) {
                closeModal("rfqModal");
            }
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            const errDetail = error.text || error.message || (typeof error === 'string' ? error : JSON.stringify(error));
            showToast(
                "❌ Send Failed",
                `Error (${error.status || 'EmailJS'}): ${errDetail}. Please try again or WhatsApp us at +91 73043 40591.`
            );
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        });
}


// Simulated PDF Catalog Download
async function downloadProductList() {
    showToast("Generating PDF", "Creating professional product catalog — please wait...");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentW = pageW - margin * 2;

    // ── Color Palette ──
    const navy = [10, 25, 47];
    const emerald = [16, 185, 129];
    const darkEmerald = [5, 150, 105];
    const white = [255, 255, 255];
    const lightGray = [248, 250, 252];
    const midGray = [148, 163, 184];
    const darkText = [30, 41, 59];
    const accentBlue = [59, 130, 246];

    // ── Helper: Load image as base64 ──
    function loadImageBase64(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    // ── Pre-load all images ──
    const logoBase64 = await loadImageBase64('assets/logo.jpg');
    const productImages = {};
    for (const p of PRODUCTS_DATA) {
        if (p.image) {
            productImages[p.id] = await loadImageBase64(p.image);
        }
    }

    // ── Helper: Draw watermark ──
    function drawWatermark() {
        if (!logoBase64) return;
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.04 }));
        const wmSize = 90;
        doc.addImage(logoBase64, 'JPEG', (pageW - wmSize) / 2, (pageH - wmSize) / 2, wmSize, wmSize);
        doc.restoreGraphicsState();
    }

    // ── Helper: Draw footer on every page ──
    function drawPageFooter(pageNum, totalPages) {
        const footerY = pageH - 14;
        // Footer line
        doc.setDrawColor(...midGray);
        doc.setLineWidth(0.3);
        doc.line(margin, footerY - 4, pageW - margin, footerY - 4);

        doc.setFontSize(7);
        doc.setTextColor(...midGray);
        doc.text('DR. KURMI\'S PHARMAGRO LLP  |  Shop no.3, Uttam Villa, Road no. 10, Daulat Nagar, Borivali East, Mumbai - 400066', margin, footerY);
        doc.text('Phone: +91 73043 40591  |  Email: kurmipa25@gmail.com  |  WhatsApp: +91 73043 40591', margin, footerY + 3.5);

        doc.text(`Page ${pageNum} of ${totalPages}`, pageW - margin, footerY + 1.5, { align: 'right' });
    }

    // ── Helper: Draw header bar for content pages ──
    function drawContentHeader() {
        doc.setFillColor(...navy);
        doc.rect(0, 0, pageW, 22, 'F');

        if (logoBase64) {
            doc.addImage(logoBase64, 'JPEG', margin, 3, 16, 16);
        }

        doc.setTextColor(...white);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('DR. KURMI\'S PHARMAGRO LLP', margin + 20, 10);

        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(200, 215, 230);
        doc.text('OFFICIAL PRODUCT CATALOG 2026', margin + 20, 15.5);

        // Emerald accent line
        doc.setFillColor(...emerald);
        doc.rect(0, 22, pageW, 1.5, 'F');
    }

    // ═══════════════════════════════════════════
    // PAGE 1 — COVER PAGE
    // ═══════════════════════════════════════════
    // Full navy background
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, pageH, 'F');

    // Emerald accent bar at top
    doc.setFillColor(...emerald);
    doc.rect(0, 0, pageW, 4, 'F');

    // Watermark
    if (logoBase64) {
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.06 }));
        doc.addImage(logoBase64, 'JPEG', (pageW - 120) / 2, (pageH - 120) / 2 - 10, 120, 120);
        doc.restoreGraphicsState();
    }

    // Logo
    if (logoBase64) {
        doc.addImage(logoBase64, 'JPEG', (pageW - 40) / 2, 45, 40, 40);
    }

    // Company name
    doc.setTextColor(...white);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('DR. KURMI\'S', pageW / 2, 105, { align: 'center' });
    doc.text('PHARMAGRO LLP', pageW / 2, 117, { align: 'center' });

    // Emerald divider line
    doc.setDrawColor(...emerald);
    doc.setLineWidth(1.2);
    doc.line(pageW / 2 - 35, 125, pageW / 2 + 35, 125);

    // Tagline
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 200, 220);
    doc.text('Quality-Focused Sourcing & Reliable Product Partnerships', pageW / 2, 134, { align: 'center' });

    // Document title box
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(pageW / 2 - 50, 150, 100, 14, 3, 3, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL PRODUCT CATALOG', pageW / 2, 159.5, { align: 'center' });

    // Year
    doc.setFontSize(28);
    doc.setTextColor(...emerald);
    doc.text('2026', pageW / 2, 182, { align: 'center' });

    // Certifications row
    const certs = ['WHO-GMP Sourced', 'ISO 9001:2015', 'FSSAI Registered', 'CDSCO Compliant'];
    doc.setFontSize(7);
    doc.setTextColor(150, 170, 190);
    const certY = 200;
    const certSpacing = contentW / 4;
    certs.forEach((c, i) => {
        doc.text(c, margin + certSpacing * i + certSpacing / 2, certY, { align: 'center' });
    });

    // Bottom contact bar
    doc.setFillColor(5, 18, 35);
    doc.rect(0, pageH - 30, pageW, 30, 'F');
    doc.setFillColor(...emerald);
    doc.rect(0, pageH - 30, pageW, 0.8, 'F');

    doc.setTextColor(180, 200, 220);
    doc.setFontSize(7.5);
    doc.text('Shop no.3, Uttam Villa, Road no. 10, Daulat Nagar, Borivali East, Mumbai - 400066', pageW / 2, pageH - 19, { align: 'center' });
    doc.text('Phone: +91 73043 40591  |  Email: kurmipa25@gmail.com  |  WhatsApp: +91 73043 40591', pageW / 2, pageH - 13, { align: 'center' });

    doc.setFontSize(6.5);
    doc.setTextColor(100, 120, 140);
    doc.text('CONFIDENTIAL — FOR AUTHORIZED DISTRIBUTION PARTNERS ONLY', pageW / 2, pageH - 7, { align: 'center' });

    // ═══════════════════════════════════════════
    // PAGE 2 — TABLE OF CONTENTS
    // ═══════════════════════════════════════════
    doc.addPage();
    drawWatermark();
    drawContentHeader();

    let y = 34;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text('Product Catalog Index', margin, y);
    y += 4;

    // Emerald underline
    doc.setFillColor(...emerald);
    doc.rect(margin, y, 40, 1.2, 'F');
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'normal');
    doc.text('This document contains detailed specifications of all products offered by Dr. Kurmi\'s Pharmagro LLP.', margin, y);
    y += 12;

    // Group products by category
    const b2cProducts = PRODUCTS_DATA.filter(p => p.category === 'b2c');
    const comProducts = PRODUCTS_DATA.filter(p => p.category === 'commercial');

    function drawTocSection(title, products, startY) {
        doc.setFillColor(240, 245, 250);
        doc.roundedRect(margin, startY, contentW, 9, 2, 2, 'F');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...navy);
        doc.text(title, margin + 6, startY + 6.2);
        startY += 14;

        products.forEach((p, i) => {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...darkText);
            
            // Product number circle
            doc.setFillColor(...emerald);
            doc.circle(margin + 4, startY - 1.2, 3, 'F');
            doc.setTextColor(...white);
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.text(`${i + 1}`, margin + 4, startY - 0.3, { align: 'center' });
            
            // Product name
            doc.setTextColor(...darkText);
            doc.setFontSize(9.5);
            doc.setFont('helvetica', 'bold');
            doc.text(p.name, margin + 12, startY);
            
            // Product ID and form
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...midGray);
            doc.text(`${p.id}  •  ${p.dosageForm}  •  ${p.packaging}`, margin + 12, startY + 4.5);
            
            // Dotted line
            doc.setDrawColor(220, 225, 230);
            doc.setLineDashPattern([1, 1], 0);
            doc.line(margin, startY + 8, pageW - margin, startY + 8);
            doc.setLineDashPattern([], 0);
            
            startY += 13;
        });

        return startY;
    }

    if (b2cProducts.length > 0) {
        y = drawTocSection('B2C CONSUMER CARE PRODUCTS', b2cProducts, y);
        y += 4;
    }
    if (comProducts.length > 0) {
        y = drawTocSection('COMMERCIAL PRODUCTS', comProducts, y);
    }

    // ═══════════════════════════════════════════
    // PRODUCT DETAIL PAGES — One per product
    // ═══════════════════════════════════════════
    for (let i = 0; i < PRODUCTS_DATA.length; i++) {
        const prod = PRODUCTS_DATA[i];
        doc.addPage();
        drawWatermark();
        drawContentHeader();

        let py = 32;

        // ── Category badge & Product ID ──
        doc.setFillColor(...(prod.category === 'b2c' ? emerald : accentBlue));
        const badgeText = prod.categoryName.toUpperCase();
        const badgeW = doc.getTextWidth(badgeText) * 0.55 + 10;
        doc.roundedRect(margin, py, badgeW, 7, 2, 2, 'F');
        doc.setTextColor(...white);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.text(badgeText, margin + 4, py + 4.8);

        doc.setTextColor(...midGray);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.text(prod.id, pageW - margin, py + 4.8, { align: 'right' });
        py += 14;

        // ── Product Name ──
        doc.setTextColor(...navy);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(prod.name, margin, py);
        py += 4;

        // Emerald accent bar
        doc.setFillColor(...emerald);
        doc.rect(margin, py, 30, 1, 'F');
        py += 8;

        // ── Product Image ──
        const imgData = productImages[prod.id];
        if (imgData) {
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(226, 232, 240);
            doc.roundedRect(margin, py, contentW, 60, 4, 4, 'FD');
            
            try {
                const imgMaxW = contentW - 20;
                const imgMaxH = 52;
                doc.addImage(imgData, 'JPEG', margin + 10, py + 4, imgMaxW, imgMaxH, undefined, 'FAST');
            } catch (e) {
                // Image add failed, skip silently
            }
            py += 66;
        }

        // ── Specification Table ──
        py += 4;
        doc.setFillColor(...navy);
        doc.roundedRect(margin, py, contentW, 8, 2, 2, 'F');
        doc.setTextColor(...white);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        doc.text('PRODUCT SPECIFICATIONS', margin + 6, py + 5.5);
        py += 12;

        const specs = [
            ['Dosage Form', prod.dosageForm],
            ['Composition', prod.composition],
            ['Therapeutic Category', prod.therapeuticCategory],
            ['Packaging Format', prod.packaging],
            ['Compliance Standard', prod.certification]
        ];

        specs.forEach((spec, idx) => {
            if (idx % 2 === 0) {
                doc.setFillColor(248, 250, 252);
                doc.rect(margin, py - 4, contentW, 9, 'F');
            }
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...midGray);
            doc.text(spec[0], margin + 4, py);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...darkText);
            doc.text(spec[1], margin + 58, py);
            py += 9;
        });

        py += 6;

        // ── Description ──
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...navy);
        doc.text('Product Overview', margin, py);
        py += 5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkText);
        doc.setFontSize(8.5);
        const descLines = doc.splitTextToSize(prod.description, contentW - 4);
        doc.text(descLines, margin + 2, py);
        py += descLines.length * 4.5 + 4;

        // ── Indications ──
        if (prod.indications) {
            doc.setFillColor(239, 246, 255);
            doc.setDrawColor(59, 130, 246);
            doc.setLineWidth(0.4);
            const indLines = doc.splitTextToSize(prod.indications, contentW - 16);
            const indH = indLines.length * 4.5 + 8;
            doc.roundedRect(margin, py, contentW, indH, 2, 2, 'FD');

            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...accentBlue);
            doc.text('INDICATIONS & APPLICATIONS', margin + 6, py + 5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...darkText);
            doc.setFontSize(8);
            doc.text(indLines, margin + 6, py + 10);
            py += indH + 5;
        }

        // ── Key Benefits ──
        if (prod.keyBenefits && prod.keyBenefits.length > 0) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...navy);
            doc.text('Key Benefits', margin, py);
            py += 5;

            prod.keyBenefits.forEach(b => {
                doc.setFillColor(...emerald);
                doc.circle(margin + 3, py - 1, 1.2, 'F');
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...darkText);
                doc.text(b, margin + 8, py);
                py += 5;
            });
            py += 3;
        }

        // ── Directions & Storage ──
        if (prod.directions) {
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(226, 232, 240);
            const dirLines = doc.splitTextToSize('Directions: ' + prod.directions, contentW - 12);
            const dirH = dirLines.length * 4.2 + 6;
            doc.roundedRect(margin, py, contentW, dirH, 2, 2, 'FD');
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...darkText);
            doc.text(dirLines, margin + 6, py + 5);
            py += dirH + 4;
        }

        if (prod.storage) {
            doc.setFillColor(255, 251, 235);
            doc.setDrawColor(253, 186, 116);
            const stoLines = doc.splitTextToSize('Storage: ' + prod.storage, contentW - 12);
            const stoH = stoLines.length * 4.2 + 6;
            doc.roundedRect(margin, py, contentW, stoH, 2, 2, 'FD');
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(154, 52, 18);
            doc.text(stoLines, margin + 6, py + 5);
            py += stoH + 4;
        }
    }

    // ═══════════════════════════════════════════
    // LAST PAGE — CONTACT & DISCLAIMER
    // ═══════════════════════════════════════════
    doc.addPage();
    drawWatermark();
    drawContentHeader();

    let cy = 36;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text('Contact & Business Inquiries', margin, cy);
    cy += 4;
    doc.setFillColor(...emerald);
    doc.rect(margin, cy, 45, 1.2, 'F');
    cy += 12;

    // Contact info card
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, cy, contentW, 55, 4, 4, 'FD');

    if (logoBase64) {
        doc.addImage(logoBase64, 'JPEG', margin + 8, cy + 8, 22, 22);
    }

    const cxText = margin + 38;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text('DR. KURMI\'S PHARMAGRO LLP', cxText, cy + 14);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...midGray);
    doc.text('Quality-Focused Sourcing & Reliable Product Partnerships', cxText, cy + 20);

    const contactItems = [
        ['Address:', 'Shop no.3, Uttam Villa, Road no. 10, Daulat Nagar, Borivali East, Mumbai - 400066'],
        ['Phone:', '+91 73043 40591'],
        ['Email:', 'kurmipa25@gmail.com'],
        ['WhatsApp:', '+91 73043 40591']
    ];

    let ccY = cy + 30;
    contactItems.forEach(item => {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...navy);
        doc.text(item[0], margin + 8, ccY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkText);
        const lines = doc.splitTextToSize(item[1], contentW - 42);
        doc.text(lines, margin + 30, ccY);
        ccY += lines.length * 4 + 2;
    });

    cy += 62;

    // Disclaimer
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(253, 186, 116);
    doc.roundedRect(margin, cy, contentW, 28, 3, 3, 'FD');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(154, 52, 18);
    doc.text('IMPORTANT DISCLAIMER', margin + 6, cy + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120, 80, 40);
    const disclaimerLines = doc.splitTextToSize(
        'This product catalog is for informational purposes only and does not constitute a medical prescription or treatment recommendation. ' +
        'All pharmaceutical products listed are to be used only under the supervision and direction of a qualified physician. ' +
        'Dr. Kurmi\'s Pharmagro LLP does not assume liability for unsupervised use. Product availability is subject to regulatory approvals and inventory status. ' +
        'All information is accurate as of the date of publication.',
        contentW - 14
    );
    doc.text(disclaimerLines, margin + 6, cy + 13);

    cy += 34;

    // Certifications
    doc.setFillColor(240, 245, 250);
    doc.roundedRect(margin, cy, contentW, 12, 3, 3, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text('CERTIFICATIONS & COMPLIANCE:', margin + 6, cy + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...midGray);
    doc.text('WHO-GMP Sourced  •  ISO 9001:2015  •  FSSAI Registered  •  CDSCO Compliant', margin + 6, cy + 9.5);

    // ═══════════════════════════════════════════
    // ADD PAGE NUMBERS TO ALL PAGES
    // ═══════════════════════════════════════════
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        if (p === 1) continue; // Skip cover page footer
        drawPageFooter(p, totalPages);
    }

    // ── Save PDF ──
    doc.save('DR_KURMIS_PHARMAGRO_Product_Catalog_2026.pdf');
    showToast("PDF Downloaded", "Professional product catalog saved successfully!");
}

// Render Executive Leadership Cards
function initLeadership() {
    const container = document.getElementById("leadershipGrid");
    if (!container || typeof LEADERSHIP_DATA === 'undefined') return;

    container.innerHTML = LEADERSHIP_DATA.map(leader => `
        <div class="leader-card">
            <div class="leader-image-box">
                <img src="${leader.image}" alt="${leader.name}">
                <div class="leader-badge-pill" style="border-color: ${leader.badgeColor};">
                    <i class="bi ${leader.icon}" style="color: ${leader.badgeColor};"></i> ${leader.credentials}
                </div>
            </div>

            <div class="leader-body">
                <h3 class="leader-name">${leader.name}</h3>
                <div class="leader-title">${leader.role}</div>
                <div class="leader-credentials">${leader.designation}</div>
                
                <p class="leader-bio">${leader.bio}</p>

                <ul class="leader-highlights">
                    ${leader.highlights.map(h => `<li><i class="bi bi-patch-check-fill"></i> ${h}</li>`).join("")}
                </ul>
            </div>
        </div>
    `).join("");
}

