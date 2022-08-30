import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../Env/Firebase";

export function userImage() {
    console.log("fetch")
    let userImage = fetchUserImage();
    return wrapPromise(userImage);
}

export function allFeeds() {
    let feeds = fetchAllFeeds();
    return wrapPromise(feeds);
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

async function fetchUserImage() {
    let image = "";
    const docSnap = await getDoc(doc(db, "users", sessionStorage.getItem("user_id")));
    image = docSnap.data().image;
    return image;
}

async function fetchAllFeeds() {
    let feeds = [];
    await getDocs(collection(db, "feeds")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            feeds.push(doc.data());
        });
    });
    return feeds;
}