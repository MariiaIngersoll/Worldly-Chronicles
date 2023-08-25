import React, {useState} from "react"
import SinglePost from "./SinglePost"

function AllPosts({posts}) {
    const listOfPosts = posts.map((post) => {
        return <SinglePost key = {post.id} post = {post}/>
    })


return (
    <main>
        <ul className="PostsList">
            {listOfPosts}
        </ul>
    </main>
)

}
export default AllPosts