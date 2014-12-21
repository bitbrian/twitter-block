window.stream = document.getElementById('stream-items-id');

function twitter_block(node)
{
    if (!($(node).hasClass("twitter-blocked"))) {
        var tweetFavorite = $(node).find("div.ProfileTweet-action--favorite");

        var tweetBlock = $( "<div class=\"ProfileTweet-action ProfileTweet-action--block\"><button class=\"ProfileTweet-actionButton u-textUserColorHover js-actionButton js-tooltip report-tweet-block-button\" data-modal=\"ProfileTweet-block\" type=\"button\" data-original-title=\"Block\"><span class=\"Icon Icon--report\"></span><span class=\"u-hiddenVisually\">Block</span><span class=\"ProfileTweet-actionCount u-textUserColorHover ProfileTweet-actionCount--isZero\"><span class=\"ProfileTweet-actionCountForPresentation\" aria-hidden=\"true\"></span></span></button></div>" ).insertAfter(tweetFavorite);

        $(node).addClass("twitter-blocked");

        /* Add click action item for each newly added block <div> */
        $(tweetBlock).on("click", function(){
            $.ajax({
                type : 'POST',
                url : 'i/tweet/report',
                data : {
                    authenticity_token: $('#authenticity_token').val(),
                    block_user: 'true',
                    report_type: '',
                    screen_name: $(this).closest("div.tweet").attr("data-screen-name"),
                    tweet_id: $(this).closest("div.tweet").attr("data-item-id"),
                    user_id: $(this).closest("div.tweet").attr("data-user-id")
                }
            });
        });
    }
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            twitter_block(mutation.addedNodes[i]);
        }
    });
});

observer.observe(stream, {
    childList: true,
    attributes: false,
    subtree: false
});

window.addEventListener('load', function () {
    var stream = window.stream;

    for (var i = 0; i < stream.children.length; i++) {
        twitter_block(stream.children[i]);
    }
}, false);
