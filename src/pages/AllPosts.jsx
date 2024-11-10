import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "../components";
import { SyncLoader } from "react-spinners";

const AllPosts = () => {
  // Query to get posts
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["recent-posts-home"],
    queryFn: async ({ pageParam }) => {
      return axiosInstance.post("/get-recent-posts", {
        page: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage;
    },
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { ref, inView } = useInView();

  //Fetch next posts
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="pb-32 bg-greyBG">
      <h1 className="text-4xl font-medium px-6 pt-5 italic">
        The Paddock Report
      </h1>
      <h2 className="mt-4 text-lg px-6">
        Stay up-to-date with the latest in Formula 1 on the GridBox F1&apos;s
        Paddock Report! From breaking news and race recaps to in-depth analysis
        of team strategies and driver performances, our articles keep you
        connected to the pulse of the F1 world. The Paddock Report is your
        source for all things F1, beyond the track!
      </h2>
      <div className="pt-5">
        {/* Loading indicator */}
        {isLoading && (
          <div className="h-96 flex justify-center items-center">
            <SyncLoader
              loading={isLoading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        {/* Mapping posts if available */}
        {data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 ">
            {data &&
              data?.pages?.map((page) => {
                return page?.data?.posts?.map((post, index) => {
                  return <PostCard key={index} post={post} index={index} />;
                });
              })}
          </div>
        )}

        {/* Error while fetching */}
        {error && (
          <div className="flex flex-col justify-center pt-10">
            <p className="text-center mt-5 text-2xl font-medium">
              Uh oh! Couldn&apos;t fetch posts.
            </p>
          </div>
        )}

        {/* No content found */}
        {data &&
          (!data?.pages || data?.pages?.[0]?.data?.posts.length == 0) && (
            <div className="flex flex-col justify-center pt-10">
              <p className="text-center mt-5 text-2xl font-medium">
                Uh oh! Couldn&apos;t fetch posts.
              </p>
            </div>
          )}

        {/* Fetch Next page div - infinite loading */}
        {data && <div ref={ref}></div>}
      </div>
    </div>
  );
};

export default AllPosts;
