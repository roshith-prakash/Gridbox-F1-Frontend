import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as PropTypes from "prop-types";

dayjs.extend(relativeTime);

// Article Card to display on Paddock report page
const PostCard = ({ post, index }) => {
  return (
    // Card container
    <div data-aos="fade-up" key={index} className="flex justify-center">
      {/* Entire card is a link to post page to view the post */}
      <Link
        to={`/the-paddock-report/${post?.uid}`}
        className="my-5 mx-5 bg-white hover:bg-[#e1e1e1]/10 dark:bg-secondarydarkbg dark:hover:bg-white/5 dark:text-darkmodetext w-full md:w-96 lg:w-80 overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-5 dark:border-2 dark:border-zinc-700 transition-all"
      >
        {/* Thumbnail for post card. */}
        <img
          src={post?.thumbnail}
          className="h-60 w-full rounded-t-x object-center object-cover"
        />
        {/* Card Content Section */}
        <div className="py-5 px-3">
          {/* Post title - ellipsized if too long. */}
          <p className="ml-2  text-2xl font-semibold h-16 line-clamp-2 overflow-hidden">
            {post?.title}
          </p>

          {/* How long ago the post was posted. */}
          <p className="ml-2 my-5 text-sm overflow-hidden text-black/60 dark:text-white/60 text-ellipsis text-greyText">
            Posted {dayjs(post?.createdAt).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    uid: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    createdAt: PropTypes.any,
  }),
  index: PropTypes.number,
};

export default PostCard;
