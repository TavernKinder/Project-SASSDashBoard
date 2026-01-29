(function(){
    const ctx = document.getElementById('antStockChart').getContext('2d');
    const priceEl = document.getElementById('antStockPrice');
    const labels = Array.from({length:20}, (_,i)=>`-${19-i}`);
    let price = 45.67;
    function formatPrice(n){ return '$' + n.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}); }
    const data = labels.map(()=>{ price += (Math.random()-0.5)*4; return Math.round(price*100)/100; });
    if(priceEl) priceEl.textContent = formatPrice(price);

    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ants Inds. Stock',
                data: data,
                borderColor: '#ffffff',
                backgroundColor: 'rgba(76,175,80,0.12)',
                pointRadius: 0,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { beginAtZero: false }
            },
            plugins: { legend: { display: false } }
        }
    });

    setInterval(()=>{
        const nextLabel = new Date().toLocaleTimeString();
        labels.push(nextLabel);
        labels.shift();
        price += (Math.random()-0.5)*4;
        if(priceEl) priceEl.textContent = formatPrice(price);
        stockChart.data.labels = labels.slice();
        stockChart.data.datasets[0].data.push(Math.round(price*100)/100);
        stockChart.data.datasets[0].data.shift();
        stockChart.update();
    }, 2000);
})();
