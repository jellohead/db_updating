// function postIt() {

// 	console.log('Clicked the button.');
// 	var name = this.findDOMNode(this.refs.name).value.trim();
// 	var comment = this.findDOMNode(this.refs.comment).value.trim();
// 	console.console.log(name + comment);
// }

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    console.log(author + ' ' + text);

    $.post("/",
            {name: author, comment: text},
            //$(formData).serialize(),
            //formData,
            function(data, textStatus, jqXHR) {
                console.log('POST function from postIt function succeeded!');
                console.log(data + ' arrived at server!');
            }
        );




    if (!text || !author) {
      return;
    }
    //this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <CommentForm />,
  document.getElementById('content')
);





