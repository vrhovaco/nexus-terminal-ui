        // Crypto data
        const cryptoData = [
            { symbol: 'BTC', name: 'Bitcoin', price: 66543.21, change: 2.34, icon: '₿', color: '#f7931a' },
            { symbol: 'ETH', name: 'Ethereum', price: 3234.56, change: -1.23, icon: 'Ξ', color: '#627eea' },
            { symbol: 'BNB', name: 'Binance', price: 543.21, change: 4.56, icon: 'B', color: '#f3ba2f' },
            { symbol: 'SOL', name: 'Solana', price: 134.87, change: 8.91, icon: 'S', color: '#00ffa3' },
            { symbol: 'ADA', name: 'Cardano', price: 0.6234, change: -2.45, icon: '₳', color: '#0033ad' },
            { symbol: 'XRP', name: 'Ripple', price: 0.5421, change: 1.89, icon: 'X', color: '#23292f' },
            { symbol: 'DOT', name: 'Polkadot', price: 7.89, change: 3.21, icon: 'D', color: '#e6007a' },
            { symbol: 'MATIC', name: 'Polygon', price: 0.8765, change: -0.56, icon: 'M', color: '#8247e5' },
            { symbol: 'AVAX', name: 'Avalanche', price: 34.21, change: 5.67, icon: 'A', color: '#e84142' },
            { symbol: 'LINK', name: 'Chainlink', price: 14.32, change: 2.11, icon: 'L', color: '#2a5ada' }
        ];

        const portfolioHoldings = [
            { symbol: 'BTC', amount: 0.523, value: 34802.22, change: 2.34 },
            { symbol: 'ETH', amount: 8.234, value: 26631.28, change: -1.23 },
            { symbol: 'SOL', amount: 156.7, value: 21137.13, change: 8.91 },
            { symbol: 'BNB', amount: 42.1, value: 22869.21, change: 4.56 },
            { symbol: 'ADA', amount: 12450, value: 7759.83, change: -2.45 }
        ];

        // Render watchlist
        function renderWatchlist() {
            const watchlist = document.getElementById('watchlist');
            watchlist.innerHTML = cryptoData.map((crypto, index) => `
                <div class="crypto-item ${index === 0 ? 'active' : ''}" data-symbol="${crypto.symbol}">
                    <div class="crypto-info">
                        <div class="crypto-icon" style="background: ${crypto.color}20; color: ${crypto.color};">
                            ${crypto.icon}
                        </div>
                        <div class="crypto-details">
                            <h3>${crypto.symbol}</h3>
                            <p>${crypto.name}</p>
                        </div>
                    </div>
                    <div class="crypto-price">
                        <div class="price">$${crypto.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div class="change ${crypto.change >= 0 ? 'positive' : 'negative'}">
                            ${crypto.change >= 0 ? '▲' : '▼'} ${Math.abs(crypto.change)}%
                        </div>
                    </div>
                </div>
            `).join('');

            // Add click handlers
            document.querySelectorAll('.crypto-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.crypto-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    updateChart(this.dataset.symbol);
                });
            });
        }

        // Render portfolio
        function renderPortfolio() {
            const holdings = document.getElementById('holdings');
            holdings.innerHTML = portfolioHoldings.map(holding => {
                const crypto = cryptoData.find(c => c.symbol === holding.symbol);
                return `
                    <div class="holding-item">
                        <div>
                            <div class="holding-name">${holding.symbol}</div>
                            <div class="holding-amount">${holding.amount.toFixed(4)}</div>
                        </div>
                        <div class="holding-value">
                            <div class="holding-value-usd">$${holding.value.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                            <div class="holding-value-change ${holding.change >= 0 ? 'positive' : 'negative'}">
                                ${holding.change >= 0 ? '+' : ''}${holding.change}%
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Chart setup
        let chart;
        function initChart() {
            const ctx = document.getElementById('mainChart').getContext('2d');
            
            // Generate random price data
            const labels = [];
            const data = [];
            let basePrice = 66543;
            
            for (let i = 60; i >= 0; i--) {
                labels.push(i === 0 ? 'Now' : `${i}m`);
                basePrice += (Math.random() - 0.5) * 500;
                data.push(basePrice);
            }

            const gradient = ctx.createLinearGradient(0, 0, 0, 350);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Price',
                        data: data,
                        borderColor: '#00f0ff',
                        backgroundColor: gradient,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#00f0ff',
                        pointHoverBorderColor: '#0a0a0f',
                        pointHoverBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(10, 10, 15, 0.9)',
                            titleColor: '#00f0ff',
                            bodyColor: '#e8e8f0',
                            borderColor: '#00f0ff',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString('en-US', {minimumFractionDigits: 2});
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0, 240, 255, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#8888a8',
                                font: { family: 'IBM Plex Mono', size: 10 }
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(0, 240, 255, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#8888a8',
                                font: { family: 'IBM Plex Mono', size: 10 },
                                callback: function(value) {
                                    return '$' + value.toLocaleString('en-US', {maximumFractionDigits: 0});
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }

        function updateChart(symbol) {
            document.getElementById('selectedCrypto').textContent = symbol;
            // Update chart data (simplified - in real app would fetch new data)
            const newData = chart.data.datasets[0].data.map(val => 
                val + (Math.random() - 0.5) * 1000
            );
            chart.data.datasets[0].data = newData;
            chart.update('none');
        }

        // Time period buttons
        document.querySelectorAll('.time-button').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.time-button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Trade tabs
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const orderBtn = document.querySelector('.order-button');
                if (this.classList.contains('sell')) {
                    orderBtn.textContent = 'EXECUTE SELL';
                    orderBtn.classList.add('sell');
                } else {
                    orderBtn.textContent = 'EXECUTE BUY';
                    orderBtn.classList.remove('sell');
                }
            });
        });

        // Live price updates
        setInterval(() => {
            cryptoData.forEach(crypto => {
                crypto.price += (Math.random() - 0.5) * crypto.price * 0.001;
                crypto.change = ((Math.random() - 0.5) * 10);
            });
            renderWatchlist();
            
            // Update chart
            if (chart) {
                const lastValue = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
                const newValue = lastValue + (Math.random() - 0.5) * 200;
                chart.data.datasets[0].data.shift();
                chart.data.datasets[0].data.push(newValue);
                chart.update('none');
            }
        }, 2000);

        // Initialize
        renderWatchlist();
        renderPortfolio();
        initChart();
