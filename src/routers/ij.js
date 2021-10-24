/* const sequelize = getConnection();
const { address, products } = req.body;
const t = await sequelize.transaction();
const userId = req.user.mail.id
const pay = Number(req.body.PaymentId);
const Order = getModel('Order');
const Product = getModel('Product');
const Payment = getModel('Payment');
const Status = getModel('Status');
const User = getModel('User');
const productorder = getModel('Productorder');
const est = await Status.findOne({ where: { id: 1 } });
const pagar = await Payment.findOne({ where: { id: pay } });
const per = await User.findOne({ where: { id: userId } });

try {
    const prods = [];
    for (product of products) {
        const prod = await Product.findAll({ where: { id: product.id } }, { transaction: t });
        if (!prod) {

            res.status(404).send(`Product with ID ${product.id} does not exist.`);

        } else { prods.push([prod, product.quantity]); }
    }
    const order = await Order.create({ StatusId: est.id, PaymentId: pagar.id, UserId: per.id, address }, { transaction: t });
    for (data of prods) {
        const [prod, quantity] = data;
        const total = prod[0].dataValues.price * quantity;
        await productorder.create({ ProductId: prod[0].dataValues.id, OrderId: order.id, quantity: quantity, total: total }, { transaction: t });
    }
    await t.commit();
    const r = await Order.findOne({
        where: {
            id: order.id
        }, include: [Product]
    });
    res.json(r);
} catch (error) {
    await t.rollback();
    res.status(500).send('One of the products does not exist. Please check the menu.');
}
});
 */