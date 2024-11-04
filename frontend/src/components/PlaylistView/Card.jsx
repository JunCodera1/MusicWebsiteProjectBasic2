const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 flex-1/5 p-4 rounded-lg ">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md h-50" src={imgUrl} alt="label" />
      </div>
      <div className="text-white  font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Card;
