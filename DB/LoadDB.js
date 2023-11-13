import storage from './Storage'
import { listAll, getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import db from './FireBase'
import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';









//로드 문
//로드 문
//로드 문
//로드 문






//유저 이미지 로드  
export const loadUserImages = async () => {
    const imageUrls = [];
    try {
        const storageRef = ref(storage, '/userProfile');
        const result = await listAll(storageRef);

        for (const item of result.items) {
            const url = await getDownloadURL(item);
            imageUrls.push({ url, name: item.name });
        }
    } catch (error) {
        console.error('이미지 로딩 오류:', error);
    }
    return imageUrls;
};



//특정 사용자 정보 로드 
export const loadUserSelect = async (people) => {
    let userData = {};
    try {
        // 문서 ID인 num을 사용하여 문서 참조 생성
        const docRef = doc(db, 'userInfo', people);

        // 문서 데이터 가져오기
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // 문서가 존재하는 경우
            userData = { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log('해당 문서가 존재하지 않습니다.');
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
    return userData
};


//모든 사용자 정보 로드 
export const loadUsers = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'userInfo'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};



//스타트업 이미지 로드  
export const loadStartUpImages = async () => {
    let imageUrls = [];
    try {
        const storageRef = ref(storage, '/startupProfile');
        const result = await listAll(storageRef);

        // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
        for (const item of result.items) {
            const url = await getDownloadURL(item);
            imageUrls.push({ url, name: item.name });
        }
    } catch (error) {
        console.error('이미지 로딩 오류:', error);
    }
    return imageUrls
};


//모든 스타트업 정보 로드   
export const loadStartUps = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'startupInfo'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};


//특정 스타트업 정보 로드 
export const loadStartUpSelect = async (people) => {
    let userData = {};
    try {
        // 문서 ID인 num을 사용하여 문서 참조 생성
        const docRef = doc(db, 'startupInfo', people);

        // 문서 데이터 가져오기
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // 문서가 존재하는 경우
            userData = { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log('해당 문서가 존재하지 않습니다.');
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
    return userData
};



//소속 스타트업 - 소속 스타트업 로드 
export const loadMember = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'startupMember'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};



//공동 창업자 모집 - 공동 창업자 로드 
export const loadCofounder = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'cofounder'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};



//공동 창업자 모집 - 이미지 로드
export const loadCofounderImages = async () => {
    let imageUrls = [];
    try {
        const storageRef = ref(storage, '/cofounderProfile');
        const result = await listAll(storageRef);

        // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
        for (const item of result.items) {
            const url = await getDownloadURL(item);
            imageUrls.push({ url, name: item.name });
        }
    } catch (error) {
        console.error('이미지 로딩 오류:', error);
    }
    return imageUrls
};



//특정 공동 창업자 모집 로드
export const loadCofounderSelect = async (people) => {
    let userData = {};
    try {
        // 문서 ID인 num을 사용하여 문서 참조 생성
        const docRef = doc(db, 'cofounder', people);

        // 문서 데이터 가져오기
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // 문서가 존재하는 경우
            userData = { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log('해당 문서가 존재하지 않습니다.');
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
    return userData
};



//쪽지 로드
export const loadLetter = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'letter'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};



//특정 쪽지 로드
export const loadLetterSelect = async (num) => {
    let userData = {};
    try {
        // 문서 ID인 num을 사용하여 문서 참조 생성
        const docRef = doc(db, 'letter', num);

        // 문서 데이터 가져오기
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // 문서가 존재하는 경우
            userData = { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log('해당 문서가 존재하지 않습니다.');
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
    return userData
};



// 가입 로드
export const loadJoin = async () => {
    let tempArray = [];
    try {
        const data = await getDocs(collection(db, 'join'));

        data.forEach((doc) => {
            tempArray.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
    return tempArray
};





















//업데이트 문
//업데이트 문
//업데이트 문
//업데이트 문





//내 페이지 수정
export const updateUserProject = async (num, eInfo, eCareer, eIntroduce, eProject) => {
    try {
        const docRef = doc(db, 'userInfo', num);

        await updateDoc(docRef, {
            info: eInfo,
            infoCareer: eCareer,
            infoIntroduce: eIntroduce,
            infoProject: eProject,
        });
        alert('정보가 수정되었습니다!')
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}




//내 프로필 수정
export const updateUserProfile = async (num, rePw) => {
    try {
        // Firestore에서 해당 문서의 참조 가져오기
        const userDocRef = doc(db, 'PersonLogin', num);

        await updateDoc(userDocRef, { perPW: rePw });
    } catch (error) {
        console.error('비밀번호 업데이트 오류:', error);
    }
};





//사용자 프로필 사진 업로드
export const updateUserImage = async (uri, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();


    const metadata = {
        contentType: 'image/jpeg',
    };

    // Firebase Storage의 참조를 만듭니다. 여기서 `ref`는 import한 함수를 사용합니다.
    const storageRef = ref(storage, `/userProfile/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);


    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // 진행 상태를 추적할 수 있음 (옵션)
        },
        (error) => {
            // 업로드 중 오류 처리
            console.log(error);
            alert('업로드 중 오류가 발생했습니다.');
        },
        () => {
            // 성공적으로 업로드된 경우 다운로드 URL을 가져옵니다.
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('다운로드 URL:', downloadURL);
                // 다운로드 URL을 이용한 후속 작업...
            }).catch((error) => {
                // 에러 처리
                console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
            });
        }
    );
}




//내 스타트업 페이지 수정
export const updateStartUpProject = async (num, eInfo, eIntroduce, eStack) => {
    try {
        const docRef = doc(db, 'startupInfo', num);

        await updateDoc(docRef, {
            info: eInfo,
            introduce: eIntroduce,
            stack: eStack,
        });
        alert('정보가 수정되었습니다!')
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}


//내 스타트업 페이지 단계 수정
export const updateStartUpStep = async (num, step) => {
    try {
        const docRef = doc(db, 'startupInfo', num);

        await updateDoc(docRef, {
            step: step,
        });
        alert('정보가 수정되었습니다!')
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}




//스타트업 프로필 사진 업로드
export const updateStartUpImage = async (uri, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();


    const metadata = {
        contentType: 'image/jpeg',
    };

    // Firebase Storage의 참조를 만듭니다. 여기서 `ref`는 import한 함수를 사용합니다.
    const storageRef = ref(storage, `/startupProfile/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);


    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // 진행 상태를 추적할 수 있음 (옵션)
        },
        (error) => {
            // 업로드 중 오류 처리
            console.log(error);
            alert('업로드 중 오류가 발생했습니다.');
        },
        () => {
            // 성공적으로 업로드된 경우 다운로드 URL을 가져옵니다.
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('다운로드 URL:', downloadURL);
                // 다운로드 URL을 이용한 후속 작업...
            }).catch((error) => {
                // 에러 처리
                console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
            });
        }
    );
}




















//DB 추가문
//DB 추가문
//DB 추가문
//DB 추가문



//회원가입 추가
export const addUser = async (id, pw, name, email, phone) => {
    try {
        await addDoc(collection(db, 'userInfo'), {
            perID: id,
            perPW: pw,
            name: name,
            perEmail: email,
            perPhone: phone,
            infoHeart: 0,
            infoGroup: '없음',
        });
    } catch (error) {
        console.log(error)
    }
}



//스타트업 추가
export const addStartUp = async (name, title, introduce, stack, perID) => {
    try {
        // startupInfo 컬렉션에 문서 추가
        const docRef = await addDoc(collection(db, 'startupInfo'), {
            name: name,
            info: title,
            introduce: introduce,
            stack: stack,
            step: '준비',
        });

        // 생성된 문서의 ID 가져오기
        const suID = docRef.id;

        try {
            // startupMember 컬렉션에 문서 추가, suID를 참조로 사용
            await addDoc(collection(db, 'startupMember'), {
                perID: perID,
                suID: suID, // 여기에 suID 저장
                DATE: new Date(),
                admin: 1,
            });
        } catch (error) {
            console.log("Error adding startupMember document:", error);
        }

    } catch (error) {
        console.log("Error adding startupInfo document:", error);
    }
};



//회원가입 추가
export const addLetter = async (toID, fromID, content) => {
    try {
        await addDoc(collection(db, 'letter'), {
            toID: toID,
            fromID: fromID,
            content: content,
            DATE: new Date(),
        });


    } catch (error) {
        console.log(error)
    }
}



//공동 창업자 모집글 추가
export const addCofounder = async (num, title, idea, info, benefit, uri) => {
    try {
        const docRef = await addDoc(collection(db, 'cofounder'), {
            perID: num,
            title: title,
            idea: idea,
            info: info,
            benefit: benefit,
            DATE: new Date(),
        });



        const cofounderID = docRef.id



        const response = await fetch(uri);
        const blob = await response.blob();


        const metadata = {
            contentType: 'image/jpeg',
        };

        // Firebase Storage의 참조를 만듭니다. 여기서 `ref`는 import한 함수를 사용합니다.
        const storageRef = ref(storage, `/cofounderProfile/${cofounderID}`);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);


        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // 진행 상태를 추적할 수 있음 (옵션)
            },
            (error) => {
                // 업로드 중 오류 처리
                console.log(error);
                alert('업로드 중 오류가 발생했습니다.');
            },
            () => {
                // 성공적으로 업로드된 경우 다운로드 URL을 가져옵니다.
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('다운로드 URL:', downloadURL);
                    // 다운로드 URL을 이용한 후속 작업...
                }).catch((error) => {
                    // 에러 처리
                    console.error("다운로드 URL을 가져오는 중 오류 발생:", error);
                });
            }
        );
    } catch (error) {
        console.log(error)
    }
}



//가입하기 추가
export const addJoin = async (adminID, perID, suID) => {
    try {
        await addDoc(collection(db, 'join'), {
            adminID: adminID,
            perID: perID,
            suID: suID,
            DATE: new Date(),
        });


    } catch (error) {
        console.log(error)
    }
}

















//문서 삭제
//문서 삭제
//문서 삭제
//문서 삭제



//가입 DB 문서 삭제
export const deleteJoin = async (num) => {
    try {
        await deleteDoc(doc(db, 'join', num));
    } catch (error) {
        console.error(`문서 삭제 중 오류가 발생했습니다: ${error}`);
    }
};