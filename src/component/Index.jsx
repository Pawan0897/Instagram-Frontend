import { useState } from "react";
import {
  Home,
  Search,
  Compass,
  Clapperboard,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  //   Instagram as InstagramIcon,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
  Image,
  X,
  User,
  TrendingUp,
  Hash,
} from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Your story",
    image: "https://i.pravatar.cc/150?img=12",
    own: true,
  },
  { id: 2, name: "sarah", image: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "john", image: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "alex", image: "https://i.pravatar.cc/150?img=33" },
  { id: 5, name: "emma", image: "https://i.pravatar.cc/150?img=44" },
  { id: 6, name: "david", image: "https://i.pravatar.cc/150?img=15" },
  { id: 7, name: "lisa", image: "https://i.pravatar.cc/150?img=49" },
];

const initialPosts = [
  {
    id: 1,
    username: "travelwithsarah",
    location: "Bali, Indonesia",
    profile: "https://i.pravatar.cc/150?img=47",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900",
    likes: 12480,
    caption:
      "Some places make you forget everything. Bali is definitely one of them 🌴✨",
    comments: 238,
    time: "2 hours ago",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    username: "creative.john",
    location: "New York, USA",
    profile: "https://i.pravatar.cc/150?img=11",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    likes: 8540,
    caption: "Chasing beautiful moments and capturing little memories. 📸",
    comments: 104,
    time: "5 hours ago",
    liked: false,
    saved: false,
  },
];

const suggestions = [
  {
    id: 1,
    name: "alex_morgan",
    image: "https://i.pravatar.cc/150?img=33",
    followed: false,
  },
  {
    id: 2,
    name: "emma_watson",
    image: "https://i.pravatar.cc/150?img=44",
    followed: false,
  },
  {
    id: 3,
    name: "david_lee",
    image: "https://i.pravatar.cc/150?img=15",
    followed: false,
  },
  {
    id: 4,
    name: "lisa_k",
    image: "https://i.pravatar.cc/150?img=49",
    followed: false,
  },
];

export default function Index() {
  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState(suggestions);
  const [showCreate, setShowCreate] = useState(false);
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState("");

  const toggleLike = (id) => {
    setPosts((oldPosts) =>
      oldPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const toggleSave = (id) => {
    setPosts((oldPosts) =>
      oldPosts.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post,
      ),
    );
  };

  const toggleFollow = (id) => {
    setUsers((oldUsers) =>
      oldUsers.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user,
      ),
    );
  };

  const createPost = () => {
    if (!postImage.trim()) return;

    const newPost = {
      id: Date.now(),
      username: "your_username",
      location: "Your location",
      profile: "https://i.pravatar.cc/150?img=12",
      image: postImage,
      likes: 0,
      caption,
      comments: 0,
      time: "Just now",
      liked: false,
      saved: false,
    };

    setPosts((oldPosts) => [newPost, ...oldPosts]);
    setCaption("");
    setPostImage("");
    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 h-[70px] border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-2">
            {/* <InstagramIcon size={30} /> */}
            <h1 className="text-2xl font-bold tracking-tight">Instagram</h1>
          </div>

          <div className="hidden w-[350px] items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 md:flex">
            <Search size={19} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search people, posts..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Heart size={23} />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
            </button>

            <button>
              <Send size={23} />
            </button>

            <img
              src="https://i.pravatar.cc/150?img=12"
              className="h-9 w-9 rounded-full border-2 border-gray-200 object-cover"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] pt-[70px]">
        {/* LEFT SIDEBAR */}
        <aside className="fixed bottom-0 left-0 top-[70px] z-30 hidden w-[245px] border-r border-gray-200 bg-white px-5 py-7 lg:block">
          <nav className="space-y-2">
            <SidebarItem icon={<Home size={23} />} label="Home" active />
            <SidebarItem icon={<Search size={23} />} label="Search" />
            <SidebarItem icon={<Compass size={23} />} label="Explore" />
            <SidebarItem icon={<Clapperboard size={23} />} label="Reels" />
            <SidebarItem icon={<MessageCircle size={23} />} label="Messages" />
            <SidebarItem icon={<Heart size={23} />} label="Notifications" />

            <button
              onClick={() => setShowCreate(true)}
              className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-gray-100"
            >
              <PlusSquare size={23} />
              <span className="font-medium">Create</span>
            </button>

            <SidebarItem icon={<User size={23} />} label="Profile" />
          </nav>

          <div className="absolute bottom-8 left-5 right-5">
            <button className="flex w-full items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-100">
              <Menu size={23} />
              <span className="font-medium">More</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="mx-auto w-full max-w-[950px] px-4 py-7 lg:ml-[245px] lg:px-8 xl:mr-[330px]">
          {/* STORIES */}
          <section className="mb-8 rounded-2xl border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Stories</h2>
              <button className="text-sm font-semibold text-gray-500 hover:text-black">
                Watch all
              </button>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-2">
              {stories.map((story) => (
                <button
                  key={story.id}
                  className="flex min-w-[68px] flex-col items-center gap-2"
                >
                  <div
                    className={`rounded-full p-[3px] ${
                      story.own
                        ? "border-2 border-dashed border-gray-400"
                        : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                    }`}
                  >
                    <div className="rounded-full border-[3px] border-white">
                      <img
                        src={story.image}
                        className="h-[62px] w-[62px] rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <span className="max-w-[70px] truncate text-xs text-gray-700">
                    {story.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* FEED HEADING */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Feed</h2>
              <p className="mt-1 text-sm text-gray-500">
                Discover what's happening today
              </p>
            </div>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50">
              Following
            </button>
          </div>

          {/* POSTS */}
          <div className="space-y-7">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {/* POST HEADER */}
                <div className="flex items-center justify-between px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.profile}
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-bold">{post.username}</h3>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {post.location}
                      </p>
                    </div>
                  </div>

                  <button className="rounded-full p-2 hover:bg-gray-100">
                    <MoreHorizontal size={22} />
                  </button>
                </div>

                {/* POST IMAGE */}
                <div className="bg-gray-100">
                  <img
                    src={post.image}
                    alt="Post"
                    className="max-h-[650px] w-full object-cover"
                  />
                </div>

                {/* POST ACTIONS */}
                <div className="px-4 py-4 sm:px-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button onClick={() => toggleLike(post.id)}>
                        <Heart
                          size={25}
                          className={
                            post.liked
                              ? "fill-red-500 text-red-500"
                              : "hover:text-gray-500"
                          }
                        />
                      </button>

                      <button>
                        <MessageCircle size={25} />
                      </button>

                      <button>
                        <Send size={24} />
                      </button>
                    </div>

                    <button onClick={() => toggleSave(post.id)}>
                      <Bookmark
                        size={24}
                        className={post.saved ? "fill-black" : ""}
                      />
                    </button>
                  </div>

                  <p className="mb-2 text-sm font-bold">
                    {post.likes.toLocaleString()} likes
                  </p>

                  <p className="text-sm leading-6">
                    <span className="mr-2 font-bold">{post.username}</span>
                    {post.caption}
                  </p>

                  <button className="mt-2 text-sm text-gray-500">
                    View all {post.comments} comments
                  </button>

                  <p className="mt-2 text-[11px] uppercase tracking-wide text-gray-400">
                    {post.time}
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <Smile size={21} className="text-gray-500" />

                    <input
                      placeholder="Add a comment..."
                      className="flex-1 text-sm outline-none"
                    />

                    <button className="text-sm font-bold text-blue-500 hover:text-blue-700">
                      Post
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="fixed right-[max(calc((100vw-1500px)/2+25px),25px)] top-[100px] hidden w-[285px] xl:block">
          {/* PROFILE */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">your_username</h3>
                <p className="text-xs text-gray-500">Your Name</p>
              </div>
            </div>

            <button className="text-xs font-bold text-blue-500">Switch</button>
          </div>

          {/* SUGGESTIONS */}
          <div className="mb-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-500">
                Suggested for you
              </h3>
              <button className="text-xs font-bold">See All</button>
            </div>

            <div className="space-y-5">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <h4 className="text-sm font-bold">{user.name}</h4>
                      <p className="text-xs text-gray-500">Suggested for you</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`text-xs font-bold ${
                      user.followed ? "text-gray-500" : "text-blue-500"
                    }`}
                  >
                    {user.followed ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={19} />
              <h3 className="font-bold">Trending today</h3>
            </div>

            <div className="space-y-4">
              {["Photography", "Travel Diaries", "Lifestyle", "Fashion"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Hash size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        #{item.replaceAll(" ", "")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {12 + index * 8}K posts
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <p className="mt-6 text-xs leading-6 text-gray-400">
            About · Help · Press · API · Jobs · Privacy · Terms
            <br />© 2026 INSTAGRAM
          </p>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-gray-200 bg-white px-3 py-3 lg:hidden">
        <Home size={23} />
        <Compass size={23} />
        <PlusSquare size={23} onClick={() => setShowCreate(true)} />
        <Clapperboard size={23} />
        <img
          src="https://i.pravatar.cc/150?img=12"
          className="h-6 w-6 rounded-full"
        />
      </div>

      {/* CREATE POST MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-[500px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-bold">Create new post</h2>
              <button onClick={() => setShowCreate(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold">your_username</p>
                  <p className="text-xs text-gray-500">Share your moment</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2 text-gray-500">
                  <Image size={19} />
                  <span className="text-sm font-medium">Image URL</span>
                </div>

                <input
                  value={postImage}
                  onChange={(e) => setPostImage(e.target.value)}
                  placeholder="Paste your image URL here..."
                  className="w-full rounded-lg bg-gray-100 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />

                {postImage && (
                  <img
                    src={postImage}
                    alt="Preview"
                    className="mt-4 max-h-60 w-full rounded-xl object-cover"
                  />
                )}
              </div>

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={3}
                className="w-full resize-none rounded-xl bg-gray-100 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={createPost}
                disabled={!postImage.trim()}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Share Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition ${
        active ? "bg-gray-100 font-bold" : "font-medium hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
