const PurchaseList = ({ purchases = [] }) => {
    if (!purchases.length) {
      return <h3>No Purchases Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Purchases
        </h3>
        <div className="flex-row my-4">
          {purchases &&
            purchases.map((purchase) => (
              <div key={purchase._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <p>{purchase.createdAt}</p>
                  <p>{purchase.cost}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default PurchaseList;
  