module.exports = (Product, LineItem, Order) => {
    return Product.bulkCreate([
        { name: 'Sid Meier\s Civilization' },
        { name: 'Sid Meier\'s Civilization II' },
        { name: 'Maniac Mansion II: Day of the Tentacle' },
        { name: 'King\'s Quest V: Absence Makes the Heart Go Yonder!' },
        { name: 'King\'s Quest VI: Heir Today, Gone Tomorrow' },
        { name: 'King\'s Quest VII: The Princeless Bride' },
        { name: 'The Secret of Monkey Island' },
        { name: 'Monkey Island 2: LeChuck\'s Revenge' },
        { name: 'Stunts: 4D Sports Driving' }
    ])
        .then(products => {
            return Order.bulkCreate([
                { isCart: false, address: '300 East 39th street, New York' },
                { isCart: false, address: 'Costa Brava, 41, Madrid' },
                {}
            ])
        })
        .then(orders => {
            return LineItem.bulkCreate([
                { productId: 4, orderId: 1 },
                { productId: 5, orderId: 1 },
                { productId: 6, orderId: 1 },
                { productId: 3, orderId: 2, quantity: 2 },
                { productId: 1, orderId: 3 },
                { productId: 2, orderId: 3 },
                { productId: 9, orderId: 3, quantity: 3 }
            ])
        })
}