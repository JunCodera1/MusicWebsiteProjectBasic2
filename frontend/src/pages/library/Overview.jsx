const Overview = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold">Recently Played</h1>
      <div className="text-white px-8 pt-6">
        <div className="py-5 grid gap-5 grid-cols-5">
          {/* {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })} */}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Likes</h1>
      <div className="text-white px-8 pt-6">
        <div className="py-5 grid gap-5 grid-cols-5">
          {/* {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })} */}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Playlists</h1>
      <div className="text-white px-8 pt-6">
        <div className="py-5 grid gap-5 grid-cols-5">
          {/* {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })} */}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Albums</h1>
      <div className="text-white px-8 pt-6">
        <div className="py-5 grid gap-5 grid-cols-5">
          {/* {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })} */}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Following</h1>
      <div className="text-white px-8 pt-6">
        <div className="py-5 grid gap-5 grid-cols-5">
          {/* {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })} */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
