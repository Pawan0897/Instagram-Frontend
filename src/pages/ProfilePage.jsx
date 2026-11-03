import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { followApi, postApi } from "../api/services";
import { openModal } from "../store/uiSlice";
import { displayName } from "../lib/format";
import PostGrid from "../components/post/PostGrid";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { Empty, Loader } from "../components/ui/Loader";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);

  const { data: posts = [], isLoading } = useQuery({ queryKey: ["myPosts"], queryFn: postApi.mine });
  const { data: followers } = useQuery({ queryKey: ["followers"], queryFn: followApi.followers });
  const { data: following } = useQuery({ queryKey: ["following"], queryFn: followApi.following });

  const fullName = [me.firstName, me.lastName].filter(Boolean).join(" ");
  const about = [me.location, me.qualification].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-[760px]">
      <header className="vs-card mb-5 flex flex-col items-center gap-6 p-6 md:flex-row md:gap-10">
        <Avatar src={me.image} name={displayName(me)} size="xl" ring />
        <div className="w-full space-y-4 text-center md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <h1 className="text-xl font-extrabold">{displayName(me)}</h1>
            <div className="flex gap-2">
              <Button light onClick={() => dispatch(openModal({ name: "editProfile" }))}>Edit profile</Button>
              <Button onClick={() => dispatch(openModal({ name: "createPost" }))}>New post</Button>
            </div>
          </div>
          <div className="flex justify-center gap-8 text-[15px] md:justify-start">
            <span><b>{posts.length}</b> posts</span>
            <Link to="/people"><b>{followers?.followersCount ?? 0}</b> followers</Link>
            <Link to="/people"><b>{following?.followingCount ?? 0}</b> following</Link>
          </div>
          <div className="text-sm">
            {fullName && <p className="font-semibold">{fullName}</p>}
            {about && <p className="text-[var(--muted)]">{about}</p>}
            <p className="text-[var(--muted)]">{me.socialAccount === 1 ? "Private account" : "Public account"}</p>
          </div>
        </div>
      </header>

      <div className="vs-card p-3 md:p-4">
        {isLoading && <Loader />}
        {!isLoading && posts.length === 0 && <Empty title="No posts yet" text="Photos you share will appear here." />}
        <PostGrid items={posts} />
      </div>
    </div>
  );
}
