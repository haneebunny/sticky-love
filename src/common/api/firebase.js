import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6-540OJgfNDluZ5ljZTnId2lKZdOPcTA",
  authDomain: "pretty-memo-boards.firebaseapp.com",
  projectId: "pretty-memo-boards",
  storageBucket: "pretty-memo-boards.appspot.com",
  messagingSenderId: "86515548238",
  appId: "1:86515548238:web:99237c6ce76343a189c31f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export function writeBoard(name, content) {
  console.log(name, content);

  const boardId = Date.now();

  set(ref(database, `boards/${boardId}`), {
    name,
    content,
    boardId,
  });
}

export async function readBoards() {
  return new Promise((resolve, reject) => {
    const BoardsRef = ref(database, "boards");
    onValue(
      BoardsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        resolve(data);
      },
      (error) => {
        console.log("Error occurred while fetching boards:", error);
        reject(error);
      }
    );
  });
}
