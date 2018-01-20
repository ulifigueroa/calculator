document.onreadystatechange = () => {
    switch (document.readyState) {
        case 'interactive':
            let app = new App()

            app.init()
            break
    }
}

App = function () {
    this.calculator = null

    return {
        init: () => {
            this.calculator = new Calculator()

            document.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    const { type, value } =  event.target.dataset
                    const display = this.calculator.push(type, value)

                    document.getElementById('accumulator').innerText = display
                }
            })
        }
    }
}

Calculator = function() {
    this.currentNumber = ''
    this.queue = []

    var solve = (queue) => {
        if (queue.length === 1) {
            return queue[0].value
        } else {
            const newQueue = queue.slice(2)
            return eval(`${queue[0].value} ${queue[1].value} ${solve(newQueue)}`)
        }
    };

    return {
        push: (type, value) => {
            let display = ''

            switch (type) {
                case 'number': {
                    display = this.currentNumber = `${this.currentNumber}${value}`
                    break
                }

                case 'operator': {
                    if (this.currentNumber !== '') {
                        this.queue.push({ type: 'number', value: this.currentNumber })
                        this.currentNumber = ''
                    }

                    if (value === '=') {
                        display = this.currentNumber = solve(this.queue)
                        this.queue = [{ type: 'number', value: this.currentNumber }]
                        this.currentNumber = ''
                    } else {
                        display = value
                        this.queue.push({ type, value })
                    }

                    break
                }
            }

            return display
        }
    }
}