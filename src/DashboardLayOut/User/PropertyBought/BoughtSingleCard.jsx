import { Link } from "react-router";

const BoughtSingleCard = ({ data }) => {
  const {
    propertyTitle,
    location,
    agentName,
    offerAmount,
    propertyImage,
    status,
    transactionId,
  } = data || {};
  // console.log("kk", data);
  return (
    <div className="card bg-base-100 mt-20 shadow-sm">
      <figure>
        <img src={propertyImage} alt={propertyTitle} />
      </figure>
      <div className="card-body">
        <h3 className="text-lg font-semibold">{propertyTitle}</h3>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Agent:</strong> {agentName}
        </p>
        <p className="text-green-600 font-semibold">
          Offer Amount: ${offerAmount?.toLocaleString()}
        </p>
        {/* Show status directly */}
        <p className="text-sm font-semibold">
          Status:{" "}
          <span
            className={
              status === "bought" ? "text-green-600" : "text-yellow-500"
            }
          >
            {status || "pending"}
          </span>
        </p>

        <div className="card-actions justify-end">
          {status === "bought" && transactionId ? (
            <span className="text-blue-600 font-medium text-sm text-center">
              transactionId: <code>{transactionId}</code>
            </span>
          ) : (
            <Link
              to="/dashboard/PaymentPage"
              state={data}
              className="btn bg-green-500 text-white"
            >
              Purchase
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoughtSingleCard;
