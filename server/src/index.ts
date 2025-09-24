import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

// 1. 데이터 구조를 카테고리별 객체로 변경
const foodMenu: { [category: string]: string[] } = {
    "한식": ["삼겹살","김치찌개","갈비찜", "닭볶음탕"],
    "중식": ["짜장면", "짬뽕", "탕수육", "마라탕", "마라샹궈"],
    "일식": ["초밥", "라멘", "돈까스", "우동"],
    "양식": ["파스타", "피자", "스테이크", "리조또"],
    "분식": ["떡볶이", "김밥", "불닭볶음면", "순대", "진라면", "신라면"]
};

// 2. API 엔드포인트 수정
// '/api/foods' 요청이 오면 모든 메뉴를 반환하고,
// '/api/foods?category=한식' 처럼 쿼리가 오면 해당 카테고리 메뉴만 반환
app.get('/api/foods', (req: Request, res: Response) => {
    // 3. 쿼리 파라미터에서 카테고리 값을 가져옴
    const { category } = req.query;

    // 4. 카테고리 값이 있고, 해당 카테고리가 foodMenu에 존재하면
    if (typeof category === 'string' && foodMenu[category]) {
        // 해당 카테고리의 음식 리스트만 반환
        res.json(foodMenu[category]);
    } else {
        // 그렇지 않으면 전체 메뉴 객체를 반환
        res.json(foodMenu);
    }
});

app.listen(port, () => {
    console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});