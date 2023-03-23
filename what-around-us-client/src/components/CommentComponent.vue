<template>
  <div className="comments">
    <h2>Comments</h2>
    <div className="comments-form">
      <form onSubmit="">
        <ul>
          <li>
            <input name="username" type="text" placeholder="Name" onChange={this.handleChange} required />
          </li>
          <li>
            <textarea name="comment" placeholder="Comment" onChange={this.handleChange} required></textarea>
          </li>
          <li>
            <input type="submit" value="Post" />
          </li>
        </ul>
      </form>
    </div>
    <div className="comments-list">
      <div v-for="(message,i) in comment" :key="i" className="comment">
        <h4>{{message.idUser}}</h4>
        <p class="timestamp">{{message.date}}</p>
        <p>{{message.comment}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentComponent",
    beforeMount() {
      this.comment = [
        {
          "idCity": 1,
          "idUser": 123,
          "comment": "C'est une belle ville avec beaucoup de culture",
          "grade": 4.5,
          "date": "03/22/23, 09:05 PM"
        },
        {
          "idCity": 2,
          "idUser": 456,
          "comment": "J'ai adoré cette ville !",
          "grade": 5,
          "date": "03/22/23, 10:15 AM"
        },
        {
          "idCity": 3,
          "idUser": 789,
          "comment": "C'était une ville intéressante à visiter",
          "grade": 3.5,
          "date": "03/22/23, 02:30 PM"
        }
      ];
    },
    data() {
      return {
        comment: [],
      };
    },
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