// jshint esversion: 8
const db = firebase.firestore();

export async function getItems() {
    try {
        let texts = [];
        const response = await db
            .collection("texts")
            .get();

        response.forEach(function (item) {
            texts.push(item.data());
        });

        return texts;
    } catch (error) {
        throw new Error(error);
    }
}