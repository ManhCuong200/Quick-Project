import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import BlogItem from "@/components/BlogItem";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://api-blog-af3u.onrender.com/api/posts");
        if (!res.ok) throw new Error("Không lấy được danh sách blog");
        const data = await res.json();

        console.log("✅ Kết quả API:", data);
        const items = Array.isArray(data.items) ? data.items : [];
        setBlogs(items);
        setFilteredBlogs(items); 
      } catch (err) {
        console.error("❌ Lỗi fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    const query = inputValue.trim().toLowerCase();
    if (query === "") {
      setFilteredBlogs(blogs);
      return;
    }

    const result = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query)
    );
    setFilteredBlogs(result);
  };

  return (
    <div>
      <HeroSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch} 
      />

      {error && (
        <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
      )}

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-card shadow-md rounded-xl overflow-hidden"
              >
                <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : hasSearched && filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Không tìm thấy bài viết nào phù hợp.
        </p>
      ) : (
        <BlogItem blogs={filteredBlogs} />
      )}
    </div>
  );
};

export default Home;
