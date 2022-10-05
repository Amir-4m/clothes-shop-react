
const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
    },
    {
      id: 2,
      title: 'Jackets',
    }
  ]
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div className="category-container" key={category.id}>
          <div className="category-background-image"></div>
          <div className="category-body-container">
            <h2>{category.title}</h2>
            <p>Shop Now</p>

          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
