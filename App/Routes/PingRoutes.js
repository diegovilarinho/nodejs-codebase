module.exports = [
    {
        method: 'get',
        route: '/ping',
        handler: (req, res) => res.answer(200, {
            title: "Sygnum Journey API",
            version: "1.0.0"
        }),
    }
]