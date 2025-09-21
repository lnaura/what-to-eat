import React, { useState, useEffect } from 'react';
import './App.css';

// 1. 서버의 데이터 구조와 동일한 타입을 정의
type FoodMenu = {
  [category: string]: string[];
};

function App() {
  // 2. 상태 변수 수정 및 추가
  const [foodMenu, setFoodMenu] = useState<FoodMenu>({}); // 전체 메뉴 객체
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 선택된 카테고리
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  // 3. 데이터 가져오기 로직 수정 (이제 전체 메뉴 객체를 받아옴)
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/api/foods');
        const data: FoodMenu = await response.json();
        setFoodMenu(data);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchFoods();
  }, []);

  // 4. 메뉴 뽑기 핸들러 수정
  const handlePickFood = () => {
    let listToPickFrom: string[] = [];

    // '전체' 카테고리가 선택되면 모든 음식을 하나의 배열로 합침
    if (selectedCategory === '전체') {
      listToPickFrom = Object.values(foodMenu).flat();
    } 
    // 특정 카테고리가 선택되면 해당 카테고리의 음식 목록을 사용
    else if (foodMenu[selectedCategory]) {
      listToPickFrom = foodMenu[selectedCategory];
    }

    if (listToPickFrom.length === 0) return;

    const randomIndex = Math.floor(Math.random() * listToPickFrom.length);
    const randomFood = listToPickFrom[randomIndex];
    setSelectedFood(randomFood);
  };

  const categories = ['전체', ...Object.keys(foodMenu)];

  return (
    <div className="App">
      <header className="App-header">
        <h1>오늘 뭐 먹지?</h1>

        {/* 5. 카테고리 필터 버튼 렌더링 */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="result-box">
          {selectedFood ? <h2>{selectedFood}</h2> : <p>카테고리를 선택하고 메뉴를 추천받으세요!</p>}
        </div>
        
        <button 
          className="pick-button"
          onClick={handlePickFood} 
          disabled={Object.keys(foodMenu).length === 0}
        >
          {Object.keys(foodMenu).length > 0 ? '메뉴 뽑기!' : '로딩 중...'}
        </button>
      </header>
    </div>
  );
}

export default App;