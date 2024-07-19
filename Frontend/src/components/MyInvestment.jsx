function MyDonations({ src, funds, amount, total_amount }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start bg-white p-6 rounded-lg shadow-md">
      <div className="w-full md:w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="Property"
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center md:text-left md:flex md:flex-col justify-evenly  md:h-48">
        <h2 className="text-3xl font-semibold mb-2">{funds}</h2>
      </div>

      <div className="w-full md:w-1/4 text-center md:text-right md:flex md:flex-col justify-evenly  md:h-48">
        <h2 className="text-2xl font-bold mb-2">Total : $ {total_amount}</h2>
        <h2 className="text-2xl font-bold mb-2">Donated : $ {amount}</h2>
      </div>
    </div>
  );
}

export default MyDonations;
