import { useGetReviewsQuery } from '../services/createApi';
import Stars from './Stars';
import RatingSystem from './ProductRating';
import { Oval } from 'react-loader-spinner';
import AddReview from './AddReview';
import { useParams } from 'react-router-dom';

function ReviewsList() {
  const { productId } = useParams();
  const { data, isFetching,refetch } = useGetReviewsQuery(productId);

  const reviews = data?.reviews?.slice().reverse() || [];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 'No ratings yet';

  const colorMapping = {
    A: 'bg-red-500', B: 'bg-blue-500', C: 'bg-green-500', D: 'bg-yellow-500',
    E: 'bg-purple-500', F: 'bg-pink-500', G: 'bg-indigo-500', H: 'bg-teal-500',
    I: 'bg-orange-500', J: 'bg-gray-500', K: 'bg-red-300', L: 'bg-blue-300',
    M: 'bg-green-300', N: 'bg-yellow-300', O: 'bg-purple-300', P: 'bg-pink-300',
    Q: 'bg-indigo-300', R: 'bg-teal-300', S: 'bg-orange-300', T: 'bg-gray-300',
    U: 'bg-red-200', V: 'bg-blue-200', W: 'bg-green-200', X: 'bg-yellow-200',
    Y: 'bg-purple-200', Z: 'bg-pink-200'
  };

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }

    return `${seconds} seconds ago`;
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center w-full py-10">
        <Oval width={40} height={40} color="gray" />
      </div>
    );
  }

  return (
    <div className="w-full my-6 space-y-12">
      <AddReview refetch={refetch} timeAgo={timeAgo} reviews = {reviews} colorMapping={colorMapping} />
      <RatingSystem ratings={reviews} averageRating={averageRating} />

      <div className="flex flex-col grid-cols-2 gap-6 lg:grid">
        {reviews.length > 0 ? (
          reviews.map((item) => (
            <div
              key={item?._id}
              className="w-full p-3 space-y-4 bg-white border rounded-xl"
            >
              <div className="flex items-center gap-2 space-y-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 text-white ${
                    colorMapping[item.userName[0]?.toUpperCase()] || 'bg-gray-400'
                  } rounded-full`}
                >
                  {item.userName[0]?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h1>{item?.userName}</h1>
                  <span className="text-[10px] opacity-70">
                    {timeAgo(item?.createdAt)}
                  </span>
                </div>
              </div>
              <Stars rating={item?.rating} />
              <h1 className="text-xs font-semibold">{item.reviewTitle}</h1>
              <p className="text-xs break-words">{item?.reviewDesc}</p>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-4 text-sm italic text-center text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewsList;
