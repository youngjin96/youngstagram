import { getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";
import { db } from "../../Env/Firebase";

export function fetchMyFeedData() {
    let userData = fetchUserData();
    let myFeeds = fetchMyFeeds();
    return {
        userData: wrapPromise(userData),
        myFeeds: wrapPromise(myFeeds)
    };
}

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

async function fetchUserData() {
    console.log("fetch")
    let userData = {};
    const docSnap = await getDoc(doc(db, "users", sessionStorage.getItem("user_id")));
    userData = docSnap.data();
    return userData;
}

async function fetchMyFeeds() {
    let feeds = [];
    const q = query(collection(db, "feeds"), where("id", "==", sessionStorage.getItem("user_id")));
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            feeds.push(doc.data());
        });
    })
    return feeds;
}