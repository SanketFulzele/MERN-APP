import React, { useState, useEffect } from 'react'
import "./LinkedCard.css"
import api from '../../../api/axios'

const LinkedCard = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        let active = true

        const loadPosts = async () => {
            try {
                const [postsRes, reactionRes, detailsRes] = await Promise.all([
                    api.get('/api/linkedin-posts'),
                    api.get('/api/post-reactions'),
                    api.get('/api/post-details'),
                ])

                const mergedData = postsRes?.data?.data?.map((values) => {
                    const reactionData = reactionRes?.data?.data?.find((rec) => values.id === rec.postId)
                    const detailsData = detailsRes?.data?.data?.find((det) => values.id === det.postId)

                    return {
                        ...values,
                        likes: reactionData?.likes,
                        dislikes: reactionData?.dislikes,
                        tags: detailsData?.tags,
                        comments: detailsData?.comments,
                    }
                })

                if (active) {
                    setPosts(mergedData || [])
                }
            } catch (error) {
                console.log(error)
            }
        }

        void loadPosts()

        return () => {
            active = false
        }
    }, [])

    console.log(posts, "myall posts")


    return (
        <div className="post-cards">

        {posts?.map((data)=>{
            return <div key={data?.id} className="post-card">
                <div className="post-header">
                    <img
                        src={`https://i.pravatar.cc/${data?.id+55}`}
                        alt="profile"
                        className="profile-image"
                    />

                    <div>
                        <h3 className="user-name">Sanket Fulzele</h3>
                        <p className="user-role">Frontend Developer • React.js</p>
                    </div>
                </div>

                <div className="post-content">
                    <h2>{data?.heading}</h2>

                    <p>
                       {data?.description}
                    </p>
                </div>

                <div className="tags">
                    {data?.tags.map((tag)=><span>{tag}</span>)}
                </div>

                <div className="reaction-section">
                    <button>👍{data?.likes} Like</button>
                    <button>👎{data?.dislikes} Dislike</button>
                    <button>💬{data?.comments.length} Comment</button>
                    <button>↗️ Share</button>
                </div>

                <div className="comment-input">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                    />
                    <button>Comment</button>
                </div>

                <div className="comments-section">
                    <h4>Comments</h4>

                    {data?.comments?.map((com)=> {
                        return  <div key={com?.id} className="comment">
                        <strong>{com?.user}</strong>
                        <p>{com?.text}</p>

                        <div className="reply-input">
                            <input
                                type="text"
                                placeholder="Reply..."
                            />
                            <button>Reply</button>
                        </div>
                    </div>
                    })}
                </div>
            </div>

        })}
           
        </div>
    )
}

export default LinkedCard