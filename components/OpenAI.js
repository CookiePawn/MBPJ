import axios from 'axios';

import { openaiKey } from '../keys/Key'



//스타트업 정보 gpt 평가
export const openAIStartup = async (title, introduce, stack) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content: `너의 역할은 조건을 보고 설명에 대한 점수와 평가를 내줘. 


                    조건
                    
                    
                    * 응답 형식: {"score": "", "evaluation": ""}
                    * 점수 계산: score는 1의 자리수까지 계산되며, 소수점은 없고, 100점 만점입니다.
                    * 평가 기준: evaluation은 간단하고 일관성 있어야 하며, 몇 문장으로 요약됩니다.
                    * 엄격한 점수 기준: 스타트업 이름, 주요 사업 영역, 소개, 기술 및 스택, 시장 적합성 및  경쟁력, 팀 및 경험이 없다면 score가 20점 아래로 있다면 score가 20점 이상`},

                    { role: 'user', content: `이 글에 대한 점수를 알려줘 : 이 스타트업은 ${title}에 관한 기업이다. 소개글은 ${introduce}이고 기술 및 스택은 ${stack}이다.` },
                ],
                max_tokens: 500,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiKey}`,
                }
            }
        )

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = JSON.parse(response.data.choices[0].message.content);  

            const result = {
                score: content.score,
                evaluation: content.evaluation,
            }

            return result
        } catch (error) {
            console.error('JSON Parse error:', error)
        }

    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
    }
}








//사용자 정보 gpt 평가
export const openAIUser = async (introduce, career, project) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content: `너의 역할은 조건을 보고 설명에 대한 점수와 평가를 내줘. 


                    조건
                    
                    
                    * 응답 형식: {"score": "", "evaluation": ""}
                    * 점수 계산: score는 1의 자리수까지 계산되며, 소수점은 없고, 100점 만점입니다.
                    * 평가 기준: evaluation은 간단하고 일관성 있어야 하며, 몇 문장으로 요약됩니다.
                    * 엄격한 점수 기준: 기본점수는 0점. 설명에 자신의 향후 목표와 자신의 강점을 엄격하게 평가해서 미흡하면 충점에서 0~7점추가, 하나만 미흡하게 기재되어있으면 7~14점, 둘 다 명확하게 써있으면 14~20점을 추가해줘. 경력이 무엇을 얼마나 했는지 숫자로 명시되어있어야하고 설명에 있는 자신의 목표와 경력이 많이 일치할수록 20점에 가까운 점수를, 설명과 경력이 다른 분야라면 0에 가까운 점수를 추가해줘. 프로젝트 경험적인 측면에서 다양한 프로그래밍 언어와 많은 프로젝트 경험이 10개 이상이라면 20점을 추가하고, 프로젝트 개수가 적을수록 0에 가까운 점수를 부여해줘. 만약 사용한 프로그래밍 언어의 종류가 다양하면 10점 안팎의 가산점을 부여해줘. 설명, 경력, 프로젝트 경험의 연관성과 연계성을 평가해서 아직 경쟁력이 갖춰지지 않았으면 0~20점, 경쟁력을 갖추면 20~40점을 부여해줘.`},

                    { role: 'user', content: `이 글에 대한 점수를 알려줘 : 자신의 설명은 ${introduce}이고 경력은 ${career}이다. 프로젝트와 사용언어는 각각 JSON 형식으로 ${JSON.stringify(project.repoName)}}, ${JSON.stringify(project.repoLang)}이다.` },
                ],
                max_tokens: 500,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiKey}`,
                }
            }
        )

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = JSON.parse(response.data.choices[0].message.content);  

            const result = {
                score: content.score,
                evaluation: content.evaluation,
            }

            return result
        } catch (error) {
            console.error('JSON Parse error:', error)
        }

    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
    }
}






//스타트업에 대한 이미지 생성
export const startupDALLE = async (name, title, introduce) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: `Create an image for ${title}. I wish the photo had the letters ${name} in it.`,
                n: 1, // 생성할 이미지의 수
                size: "256x256" // 이미지의 크기
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiKey}`
                }
            }
        );

        // API로부터 반환된 이미지 URL 추출
        const imageUrl = response.data.data[0].url;

        return imageUrl;
    } catch (error) {
        console.error('Error in DALL-E Image Generation:', error.response.data.error.message);
        return null;
    }
};


