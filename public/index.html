<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M3 PRO | Live Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .hidden { display: none; }
        .side-menu { transition: 0.3s; transform: translateX(-100%); }
        .side-menu.open { transform: translateX(0); }
        body { background: #050810; color: white; }
    </style>
</head>
<body class="pb-24">

    <div id="side-menu" class="side-menu fixed inset-y-0 left-0 w-72 bg-[#0f172a] z-[60] border-r border-slate-800">
        <div class="p-6 bg-yellow-500 text-black font-black italic flex justify-between">M3 PRO <button onclick="toggleMenu()">&times;</button></div>
        <div class="p-4 space-y-2">
            <button onclick="showPage('home')" class="w-full text-left p-3 hover:bg-slate-800 rounded"><i class="fa-solid fa-house"></i> Paris</button>
            <button onclick="showPage('add-startup')" class="w-full text-left p-3 hover:bg-slate-800 rounded"><i class="fa-solid fa-plus"></i> Inscrire Startup</button>
            <button onclick="showPage('admin')" class="w-full text-left p-3 hover:bg-red-900 rounded text-red-400 font-bold"><i class="fa-solid fa-lock"></i> Admin Dashboard</button>
        </div>
    </div>

    <nav class="p-4 bg-[#0f172a] border-b border-yellow-500/20 flex justify-between sticky top-0 z-50">
        <button onclick="toggleMenu()"><i class="fa-solid fa-bars"></i></button>
        <div class="font-black italic">M3 <span class="text-yellow-500">BET</span></div>
        <div id="user-display" class="text-yellow-500 font-bold text-xs pt-1">0.00 $</div>
    </nav>

    <section id="page-home" class="page-content p-4">
        <h2 class="text-xs font-bold text-slate-500 uppercase mb-4">Paris disponibles sur les Startups</h2>
        <div id="live-bets-container" class="space-y-4">
            </div>
    </section>

    <section id="page-admin" class="page-content hidden p-4">
        <h2 class="text-xl font-black mb-6 uppercase italic text-red-500">Gestion des Comptes</h2>
        <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-800 text-slate-400">
                    <tr><th class="p-3">Pseudo</th><th class="p-3">Solde</th></tr>
                </thead>
                <tbody id="admin-user-list"></tbody>
            </table>
        </div>
    </section>

    <div id="bet-modal" class="fixed inset-0 bg-black/90 z-[100] hidden flex items-center justify-center p-6">
        <div class="bg-[#161e2f] w-full max-w-sm rounded-3xl p-8 border border-yellow-500/30">
            <h3 id="bet-target" class="text-xl font-black italic mb-2">Startup Name</h3>
            <p class="text-slate-500 text-xs mb-6">Entrez votre mise pour ce pari</p>
            <input type="number" id="bet-amount" value="100" class="w-full bg-[#050810] border border-slate-700 p-4 rounded-xl text-2xl font-black text-yellow-500 mb-6 outline-none">
            <div class="flex gap-3">
                <button onclick="closeBet()" class="flex-1 bg-slate-800 py-4 rounded-xl font-bold">Annuler</button>
                <button onclick="confirmRealBet()" class="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-black uppercase">Parier</button>
            </div>
        </div>
    </div>

    <script>
        let user = null;
        let selectedStartup = null;

        function showPage(id) {
            document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
            document.getElementById('page-'+id).classList.remove('hidden');
            if(id === 'home') loadLiveBets();
            if(id === 'admin') loadAdminUsers();
            toggleMenu(false);
        }

        async function loadLiveBets() {
            const res = await fetch('/api/startups');
            const startups = await res.json();
            const container = document.getElementById('live-bets-container');
            container.innerHTML = startups.map(s => `
                <div class="bg-[#161e2f] p-4 rounded-2xl border border-slate-800">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-black uppercase text-sm">${s.name}</p>
                            <p class="text-[9px] text-green-500 uppercase font-bold">${s.sector}</p>
                        </div>
                        <button onclick="openBet('${s.name}', '${s._id}')" class="bg-yellow-500 text-black px-6 py-3 rounded-xl font-black text-xs italic transition-transform active:scale-90">1.95</button>
                    </div>
                </div>
            `).join('');
        }

        async function loadAdminUsers() {
            const res = await fetch('/api/admin/users');
            const users = await res.json();
            document.getElementById('admin-user-list').innerHTML = users.map(u => `
                <tr class="border-b border-slate-800 italic">
                    <td class="p-3 font-bold">${u.username}</td>
                    <td class="p-3 text-yellow-500">${u.balance.toLocaleString()} $</td>
                </tr>
            `).join('');
        }

        function openBet(name, id) {
            if(!user) return alert("Veuillez créer un compte d'abord !");
            selectedStartup = id;
            document.getElementById('bet-target').innerText = name;
            document.getElementById('bet-modal').classList.remove('hidden');
        }

        function closeBet() { document.getElementById('bet-modal').classList.add('hidden'); }

        async function confirmRealBet() {
            const amount = document.getElementById('bet-amount').value;
            const res = await fetch('/api/place-bet', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ userId: user._id, amount: parseInt(amount) })
            });
            const data = await res.json();
            if(data.success) {
                user.balance = data.newBalance;
                document.getElementById('user-display').innerText = user.balance.toLocaleString() + " $";
                alert("✅ Pari de " + amount + "$ accepté !");
                closeBet();
            } else {
                alert("❌ " + data.error);
            }
        }

        // Simuler ou charger l'utilisateur après inscription
        // (Réutilise ta fonction handleRegister ici pour assigner la réponse à 'user')
    </script>
</body>
</html>