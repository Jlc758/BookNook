function Card() {
  console.log();
  return (
    <>
      <div className="card">
        <img src="src\images\BookCover.png" alt="" />
        <div className="bottom">
          <h5 className="title">Book Title</h5>
          <p className="rating">5 Stars</p>
        </div>
      </div>
    </>
  );
}

export default Card;
