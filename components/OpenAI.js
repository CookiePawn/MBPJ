import axios from 'axios';




export const generateText = async (name, title, introduce, stack) => {

    try {
        const prompt = `너의 역할은 스타트업의 설명을 보고 100점 만점으로 점수를 알려주면 돼. 일관성있게 점수가 나와야해. 스타트업의 이름은${name}이고 주제는 ${title}이다. 소개글은 ${introduce}이고 기술 및 스택은 ${stack}이다. 점수와 간단한 평가를 알려줘`;

        const apiKey = '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'; // OpenAI API 키를 여기에 입력합니다.
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const data = {
            prompt: prompt,
            max_tokens: 1024, // 원하는 최대 토큰 수를 설정합니다.
            temperature: 0.7, // 다음 텍스트의 창의성을 조절하는 옵션 (0.2가 높은 확률, 1.0이 무작위성이 큰 값)
        };

        const response = await axios.post(url, data, { headers });

        if (response.status !== 200) {
            throw new Error(`API 요청이 실패했습니다. 상태 코드: ${response.status}`);
        }

        const result = response.data;
        const generatedText = result.choices[0].text;
        console.log('생성된 텍스트:', generatedText);
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
    }

}