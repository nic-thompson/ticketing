import OrderList from '../../components/orders';
const OrderIndex = ({ orders }) => {
  return (
    <div>
      <h1>Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
