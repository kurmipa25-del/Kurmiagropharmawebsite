// CRM Central Database Simulation using LocalStorage

// Seed initial orders data if database is empty
const MOCK_ORDERS = [
    {
        id: "KP-ORD-1024",
        client: "Apex Healthcare Mumbai",
        contact: "+91 98200 12345",
        segment: "Nutraceutical Softgels",
        qty: "250 Boxes Vitamin D3",
        msg: "Requires FSSAI label verification documentation",
        date: "2026-08-16 11:32",
        status: "confirmed"
    },
    {
        id: "KP-ORD-1025",
        client: "Metro Wellness Pharmacy",
        contact: "+91 88790 55443",
        segment: "OTC & Pain Relief",
        qty: "500 Units Diclofenac Gel",
        msg: "Deliver to Borivali East warehouse directly",
        date: "2026-08-16 14:15",
        status: "pending"
    },
    {
        id: "KP-ORD-1026",
        client: "Dr. Deshmukh Clinic",
        contact: "+91 72081 11223",
        segment: "Prescription Pharma",
        qty: "100 Boxes Amoxicillin 500mg",
        msg: "Sample requested by MR Amit Sharma first",
        date: "2026-08-17 09:10",
        status: "shipped"
    },
    {
        id: "KP-ORD-1027",
        client: "Apollo Pharmacy Borivali",
        contact: "+91 99304 44556",
        segment: "Hospital Supplies",
        qty: "1000 Sterile IV Sets",
        msg: "Standard WHO-GMP sourcing certified batches only",
        date: "2026-08-17 12:45",
        status: "delivered"
    }
];

const MOCK_VISITS = [
    {
        mrName: "Amit Sharma",
        doctor: "Dr. R. K. Mehta (MD)",
        location: "Kasturba Road, Borivali East",
        notes: "Discussed prescription pharma portfolio, detailed our new pain relief tablets, requested 10 sample kits.",
        order: "No Order, sample requested",
        time: "2026-08-17 10:30"
    },
    {
        mrName: "Sneha Mehta",
        doctor: "Dr. Anjali Sen (Gynaecologist)",
        location: "Link Road, Kandivali West",
        notes: "Detailed calcium & nutraceutical softgel ranges, booking tentative for next week.",
        order: "Tentative: 50 Boxes Softgels",
        time: "2026-08-17 11:45"
    },
    {
        mrName: "Vijay Patil",
        doctor: "Dr. H. J. Dsouza (Pediatrician)",
        location: "SV Road, Malad West",
        notes: "Presented OTC syrups, ordered 15 boxes for testing immediately.",
        order: "Booked: 15 Boxes Syrup",
        time: "2026-08-17 14:20"
    }
];

// Initialize database
function initDatabase() {
    if (!localStorage.getItem("kurmi_crm_orders")) {
        localStorage.setItem("kurmi_crm_orders", JSON.stringify(MOCK_ORDERS));
    }
    if (!localStorage.getItem("kurmi_crm_visits")) {
        localStorage.setItem("kurmi_crm_visits", JSON.stringify(MOCK_VISITS));
    }
}

// Get Data
function getOrders() {
    return JSON.parse(localStorage.getItem("kurmi_crm_orders") || "[]");
}

function getVisits() {
    return JSON.parse(localStorage.getItem("kurmi_crm_visits") || "[]");
}

// Tab Switching System
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(el => el.classList.remove("active"));

    // Activate selected tab
    document.getElementById(`tab-${tabName}`).classList.add("active");
    
    // Highlight menu
    const activeMenuItem = document.querySelector(`.sidebar-menu .menu-item[data-tab="${tabName}"]`);
    if (activeMenuItem) activeMenuItem.classList.add("active");

    // Update headers
    const pageTitle = document.getElementById("pageTitle");
    const roleBadge = document.getElementById("roleBadge");

    if (tabName === "dashboard") {
        pageTitle.innerText = "Admin Dashboard";
        roleBadge.innerHTML = '<i class="bi bi-shield-lock-fill"></i> Manager Mode';
    } else if (tabName === "orders") {
        pageTitle.innerText = "Order Tracker";
        roleBadge.innerHTML = '<i class="bi bi-shield-lock-fill"></i> Manager Mode';
    } else if (tabName === "mr-portal") {
        pageTitle.innerText = "MR Representative Portal";
        roleBadge.innerHTML = '<i class="bi bi-person-workspace"></i> MR Representative Mode';
    }

    renderAll();
}

// Setup click handlers for sidebar menu items
document.querySelectorAll(".sidebar-menu .menu-item[data-tab]").forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const tabName = item.getAttribute("data-tab");
        switchTab(tabName);
    });
});

// Render everything
function renderAll() {
    const orders = getOrders();
    const visits = getVisits();

    // 1. Render Dashboard Tab KPIs
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const totalVisits = visits.length;

    document.getElementById("kpiTotalOrders").innerText = totalOrders;
    document.getElementById("kpiTotalVisits").innerText = totalVisits;
    document.getElementById("kpiPendingOrders").innerText = pendingOrders;

    // Coverage index calculation
    const coveragePct = Math.min(100, Math.round((totalVisits / 6) * 100));
    document.getElementById("gaugeCoveragePct").innerText = `${coveragePct}%`;
    document.getElementById("gaugeCoverageFill").style.width = `${coveragePct}%`;

    // 2. Render Dashboard Recent Orders Table (Top 4 recent)
    const dashboardTable = document.getElementById("dashboardOrdersTableBody");
    dashboardTable.innerHTML = "";
    
    orders.slice(0, 4).forEach(order => {
        dashboardTable.innerHTML += `
            <tr>
                <td style="font-weight:600; color:#fff;">${order.client}</td>
                <td>${order.segment}</td>
                <td>${order.qty}</td>
                <td style="font-size:0.78rem; color:var(--text-muted);">${order.date.split(" ")[0]}</td>
                <td><span class="status-badge ${order.status}">${order.status}</span></td>
            </tr>
        `;
    });

    // 3. Render Dashboard Recent Live Visits list
    const visitsList = document.getElementById("dashboardVisitsList");
    visitsList.innerHTML = "";
    
    visits.slice(0, 3).forEach(visit => {
        visitsList.innerHTML += `
            <div class="visit-item">
                <div class="visit-item-header">
                    <span class="visit-mr-name"><i class="bi bi-person-fill"></i> ${visit.mrName}</span>
                    <span class="visit-doctor">${visit.doctor}</span>
                </div>
                <div class="visit-notes">${visit.notes}</div>
                <span class="visit-time">${visit.time}</span>
            </div>
        `;
    });

    // 4. Render Master Order Tracker Tab Table
    const masterOrdersTable = document.getElementById("masterOrdersTableBody");
    masterOrdersTable.innerHTML = "";

    orders.forEach(order => {
        masterOrdersTable.innerHTML += `
            <tr>
                <td style="font-family:monospace; font-weight:600; color:var(--primary);">${order.id}</td>
                <td style="font-weight:600; color:#fff;">${order.client}</td>
                <td style="font-size:0.85rem;">${order.contact}</td>
                <td>${order.segment}</td>
                <td style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">"${order.msg || 'N/A'}"</td>
                <td style="font-size:0.8rem;">${order.date}</td>
                <td>
                    <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
            </tr>
        `;
    });

    // 5. Render Master Visits Tracker Database Table
    const masterVisitsTable = document.getElementById("masterVisitsTableBody");
    masterVisitsTable.innerHTML = "";

    visits.forEach(visit => {
        masterVisitsTable.innerHTML += `
            <tr>
                <td style="font-weight:600; color:#fff;"><i class="bi bi-person"></i> ${visit.mrName}</td>
                <td style="font-weight:600; color:var(--primary);">${visit.doctor}</td>
                <td style="font-size:0.85rem;"><i class="bi bi-geo-alt"></i> ${visit.location}</td>
                <td><span class="status-badge delivered">Visited</span></td>
                <td style="font-size:0.82rem; color:var(--text-muted);">"${visit.notes}"</td>
                <td style="font-weight:600; color:var(--accent-emerald);">${visit.order}</td>
                <td style="font-size:0.75rem;">${visit.time}</td>
            </tr>
        `;
    });
}

// Update status
function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = newStatus;
        localStorage.setItem("kurmi_crm_orders", JSON.stringify(orders));
        renderAll();
    }
}

// Modal handling
function openOrderModal() {
    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("manualOrderForm").reset();
}

// Handle Manual Order Submission
function handleOrderSubmit(e) {
    e.preventDefault();
    const client = document.getElementById("orderClient").value;
    const contact = document.getElementById("orderContact").value;
    const segment = document.getElementById("orderSegment").value;
    const qty = document.getElementById("orderQty").value;
    const msg = document.getElementById("orderMsg").value;

    const orders = getOrders();
    const newId = `KP-ORD-${1024 + orders.length + Math.floor(Math.random() * 10)}`;
    
    // Formatting date
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newOrder = {
        id: newId,
        client: client,
        contact: contact,
        segment: segment,
        qty: qty,
        msg: msg,
        date: dateStr,
        status: "pending"
    };

    orders.unshift(newOrder);
    localStorage.setItem("kurmi_crm_orders", JSON.stringify(orders));
    
    closeOrderModal();
    renderAll();
}

// Handle MR Visit Logging
function handleVisitSubmit(e) {
    e.preventDefault();
    const mrName = document.getElementById("mrName").value;
    const doctor = document.getElementById("doctorName").value;
    const location = document.getElementById("clinicLocation").value;
    const notes = document.getElementById("visitNotes").value;
    const order = document.getElementById("visitOrder").value || "No Order";

    const visits = getVisits();
    
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newVisit = {
        mrName: mrName,
        doctor: doctor,
        location: location,
        notes: notes,
        order: order,
        time: dateStr
    };

    visits.unshift(newVisit);
    localStorage.setItem("kurmi_crm_visits", JSON.stringify(visits));

    document.getElementById("mrVisitForm").reset();
    renderAll();
}

// Reset Database Functions
function clearCRMData() {
    if (confirm("Are you sure you want to reset all order data? This will restore mock defaults.")) {
        localStorage.removeItem("kurmi_crm_orders");
        initDatabase();
        renderAll();
    }
}

function clearVisitsData() {
    if (confirm("Are you sure you want to delete all MR visit logs?")) {
        localStorage.removeItem("kurmi_crm_visits");
        initDatabase();
        renderAll();
    }
}

// Authenticated Lifecycle Control
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem("kurmi_crm_logged_in") === "true";
    const appContainer = document.getElementById("crmAppContainer");
    const loginWrapper = document.getElementById("loginWrapper");

    if (isLoggedIn) {
        if (appContainer) appContainer.style.display = "flex";
        if (loginWrapper) loginWrapper.style.display = "none";
        initDatabase();
        renderAll();
    } else {
        if (appContainer) appContainer.style.display = "none";
        if (loginWrapper) loginWrapper.style.display = "flex";
    }
}

// Handle CRM Form Sign In
function handleCrmLogin(e) {
    e.preventDefault();
    const userInput = document.getElementById("loginUser").value.trim();
    const passInput = document.getElementById("loginPass").value.trim();
    const errorMsg = document.getElementById("loginError");

    // Case insensitive username "KURMI", password "12344321"
    if (userInput.toUpperCase() === "KURMI" && passInput === "12344321") {
        sessionStorage.setItem("kurmi_crm_logged_in", "true");
        if (errorMsg) errorMsg.style.display = "none";
        document.getElementById("crmLoginForm").reset();
        checkLogin();
    } else {
        if (errorMsg) errorMsg.style.display = "flex";
        document.getElementById("loginPass").value = "";
    }
}

// Log Out function
function handleCrmLogout(e) {
    if (e) e.preventDefault();
    sessionStorage.removeItem("kurmi_crm_logged_in");
    checkLogin();
}

// Run check on page load
checkLogin();
