<template>
  <div className="comments">
    <h2>Comments</h2>
    <div className="comments-form">
      <form onSubmit="">
        <ul>
          <li>
            <vue3-star-ratings class="m-2 p-0 d-flex align-items-start" v-model="rating" @click="handleChange() "
              :starSize="'20'" :showControl="false" />
          </li>
          <li>
            <textarea type="text" placeholder="Comment" v-model="comment"
              required></textarea>
          </li>
          <li>
            <input type="submit" value="Post" @click="postComment()" />
          </li>
        </ul>
      </form>
    </div>
    <div className="comments-list">
      <div v-for="(message,i) in allComment" :key="i" className="comment">
        <h4>{{message.idUser}}</h4>
        <vue3-star-ratings class="m-2 p-0 d-flex align-items-start" v-model="message.grade" :starSize="'20'" :showControl="false" :disableClick="true"/>
        <p class="timestamp">{{message.updatedAt}}</p>
        <p>{{message.comment}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import vue3StarRatings from "vue3-star-ratings";

  export default {
    name: "CommentComponent",
    components: {
      vue3StarRatings,
    },
    methods: {
      handleChange() {
        console.log(this.rating);
      },
      postComment() {
        var component = this
        console.log(component.comment);
        console.log(component.rating);
        let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            idCity: 2,
            comment: component.comment,
            grade: component.rating,
          })
        }
        fetch('/api/cityComments/createComment', options)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            console.log(data);
            this.loadComment();
          })
          .catch((error) => {
            console.log(error)
            component.isLoggedIn = false
          })
      },
      loadComment(){
        var component = this
                let options = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                fetch('/api/cityComments/2', options)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                       console.log(data)
                       this.allComment = data
                    })
                    .catch((error) => {
                        console.log(error)
                        component.isLoggedIn = false
                    })
      }
    },
    beforeMount() {
      this.loadComment()
    },
    data() {
      return {
        allComment: [],
        comment: "",
        rating: 0,
      };
    }
  }
</script>

<style>
  .comments-form {
    border-bottom: 1px solid #ccc;
  }

  .comments-form ul {
    list-style: none;
    margin-left: -40px;
  }

  .comments-form ul li {
    margin-bottom: 15px;
  }

  .comments-form ul li input[type='submit'] {
    border: 0;
    border-radius: 30px;
    padding: 7px 16px;
    background: #448ef6;
    color: #fff;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 0.9em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .comments-form ul li input[type='text'],
  .comments-form ul li textarea {
    padding: 10px;
    border: 0;
    border-radius: 10px;
    background: #f7f7f7;
  }

  .comments-form ul li input[type='text']::placeholder,
  .comments-form ul li textarea::placeholder {
    font-family: 'Rubik', sans-serif;
  }

  .comments-form ul li input[type='text']:focus,
  .comments-form ul li textarea:focus {
    background: #fff;
  }

  .comments-form ul li textarea {
    width: 80%;
    height: 80px;
    resize: none;
  }

  .comments-list {
    margin-top: 20px;
  }

  .comment {
    position: relative;
    padding: 10px 20px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .comment .timestamp {
    color: #777;
    position: absolute;
    right: 20px;
    top: 10px;
  }

  .comment h4,
  .comment p {
    margin: 10px;
  }

  footer {
    float: right;
    color: #777;
    font-size: 0.8em;
    margin-top: 15px;
  }

  .comments {
    width: 500px;
    max-width: 80%;
    min-width: 300px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 10px;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    position: relative;
    padding: 10px 20px;
    background: #efefef;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .comments h2 {
    font-size: 2.3em;
    margin-bottom: 0;
  }

  .comments ul {
    list-style: none;
    margin-left: -40px;
    margin-bottom: 15px;
  }

  .comments ul input[type='submit'] {
    border: 0;
    border-radius: 30px;
    padding: 7px 16px;
    background: #448ef6;
    color: #fff;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 0.9em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .comments ul input[type='text'] {
    padding: 10px;
    border: 0;
    border-radius: 10px;
    background: #f7f7f7;
    font-family: 'Rubik', sans-serif;
    background: #fff;
  }

  .comments ul textarea {
    width: 80%;
    height: 80px;
    resize: none;
  }

  .comments .timestamp {
    color: #777;
    position: absolute;
    right: 20px;
    top: 10px;
  }

  .comments h4,
  .comments p {
    margin: 10px;
  }
</style>