var QUIZZES_VIEW_TYPE = 0;
var LANGUAGE_POINTS_VIEW_TYPE = 1;
var g_quiz_type_cloze = 1,
g_quiz_type_multiple_choices = 2,
g_quiz_type_word_selection = 3,
g_quiz_type_public_choices = 4,
g_quiz_type_paragraph_title = 5,
g_quiz_type_paragraph_sorting = 6,
g_quiz_type_insert_text = 7,
g_quiz_type_sentence_selection = 8,
g_quiz_type_matching_paragraph_info = 9,
g_quiz_type_multiple_selections = 10,
g_quiz_type_question_group = 11,
g_article_quiz_type_cloze = g_quiz_type_cloze,
g_article_quiz_type_word_selection = g_quiz_type_word_selection,
g_article_quiz_type_paragraph_title = g_quiz_type_paragraph_title,
g_article_quiz_type_paragraph_sorting = g_quiz_type_paragraph_sorting,
g_article_quiz_type_sentence_selection = g_quiz_type_sentence_selection,
g_article_quiz_type_paragraph_info_matching = g_quiz_type_matching_paragraph_info,
g_article_quiz_type_reading_comprehension = 11,
g_subfield_article_quiz_types = [g_article_quiz_type_paragraph_info_matching, g_article_quiz_type_reading_comprehension],
g_quiz_uniq_types = [g_quiz_type_cloze, g_quiz_type_word_selection, g_quiz_type_paragraph_title, g_quiz_type_paragraph_sorting, g_quiz_type_sentence_selection, g_quiz_type_matching_paragraph_info],
g_article_reading_comprehension_quizzies = [g_quiz_type_multiple_choices, g_quiz_type_public_choices, g_quiz_type_insert_text, g_quiz_type_multiple_selections, g_quiz_type_question_group],
g_quiz_types = [{
    'id': g_quiz_type_cloze,
    'name': '完形填空',
    'has_stem': false,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_multiple_choices,
    'name': '单选题',
    'has_stem': true,
    'paragraph_enabled': true,
    'article_enabled': true,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_word_selection,
    'name': '选词填空',
    'has_stem': false,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_public_choices,
    'name': '公共选择',
    'has_stem': true,
    'paragraph_enabled': true,
    'article_enabled': true,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_paragraph_title,
    'name': '段落标题',
    'has_stem': false,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_paragraph_sorting,
    'name': '段落排序',
    'has_stem': false,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_insert_text,
    'name': '句子位置',
    'has_stem': true,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_sentence_selection,
    'name': '选句填空',
    'has_stem': false,
    'paragraph_enabled': true,
    'article_enabled': false,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_matching_paragraph_info,
    'name': '段落信息匹配',
    'has_stem': true,
    'paragraph_enabled': false,
    'article_enabled': true,
    'option_can_copy': true,
    'is_radio': true
},
{
    'id': g_quiz_type_multiple_selections,
    'name': '多选题',
    'has_stem': true,
    'paragraph_enabled': true,
    'article_enabled': true,
    'option_can_copy': true,
    'is_radio': false
},
{
    'id': g_quiz_type_question_group,
    'name': '题目编组',
    'has_stem': false,
    'paragraph_enabled': false,
    'article_enabled': true,
    'option_can_copy': false,
    'is_radio': true
}];
var URLS = {
    "review": "/api/v1/bdc/review/${id}",
    "login": "/accounts/login/?next=${next}",
    "stats": "/api/v1/read/stats/?latest",
    "article_review": "/api/v1/read/article/${article_id}/review/",
    "sources": "/read/sources/",
    "article": "/read/article/${article_id}/",
    "search_word": "/api/v1/bdc/search/",
    "article_words": "/api/v1/read/vocabulary/match/${article_id}/${type}/",
    "finish_api": "/api/v1/read/article/user/${article_id}/",
    "category_api": "/api/v1/read/category/",
    "like_article": "/api/v1/read/article/user/${article_id}/",
    "get_examples": "/api/v1/bdc/example/sys/?vocabulary_id=${id}",
    "get_quizzes": "/api/v1/read/article/${article_id}/quizzes/",
    "get_points": "/api/v1/read/article/${article_id}/points/",
    "answer": "/api/v1/read/article/answer/${quiz_id}/",
    "book_article": "/api/v1/read/book/articles/${book_id}/"
}
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return - 1;
    };
}
function foreach_word(condition, fn_action) {
    var fn_condition = null;
    if (condition instanceof RegExp) {
        fn_condition = function(word) {
            return ! (!word.match(condition));
        };
    } else if (condition instanceof Array) {
        var set = {};
        $.each(condition,
        function(ix, word) {
            set[word] = null;
        });
        fn_condition = function(word) {
            return (word in set);
        };
    } else if (condition instanceof Function) {
        fn_condition = condition;
    } else {
        fn_condition = function(word) {
            return (word in condition);
        };
    }
    var $words = $('div.article-content .page > div > p > span.sentence > span');
    $words.each(function() {
        var word = $(this).text();
        if (word.length - word.lastIndexOf("'s") == 2) word = word.slice(0, word.length - 2);
        if (word.length - word.lastIndexOf(".") == 1 && word.split('.').length < 3) word = word.slice(0, word.length - 1);
        if (word.length - word.lastIndexOf("'") == 1) word = word.slice(0, word.length - 1);
        if (fn_condition(word)) {
            return fn_action($(this));
        }
    });
}
function highlight_word(variations, source_words, c) {
    words = [];
    $.each(source_words,
    function(i, source_word) {
        if (variations[source_word]) $.each(variations[source_word],
        function(i, variation) {
            words.push(variation)
        });
    });
    foreach_word(words,
    function($word) {
        $word.addClass(c);
    })
}
function get_div_height($div, is_last_page) {
    var height = 0;
    if ($div.find('img').length) {
        $.each($div.find('img'),
        function() {
            var img_height = parseInt($(this).attr('height'));
            height += img_height > 0 ? img_height: $(this).height();
        });
    }
    $div.children().each(function() {
        if ($(this).find('img').length) return;
        height += $(this).height();
    });
    height += ($div.children().length - 1) * 15;
    if ($div.find('.head-title').length) {
        height += 20;
    }
    if (is_last_page) height += 35;
    return height;
}
function split_paragraph($fake, $content, page_height, is_last_page) {
    var index_para = -1;
    var $div = $('<div/>').addClass($content.attr('class')).attr('data', $content.attr('data')).append('<p></p>');
    $fake.find('.paragraph[data=' + $content.attr('data') + ']').remove();
    $fake.append($div);
    $div = $div.find('p');
    $content.find('.sentence').each(function(index, ele) {
        $div.append($(this).clone());
        var height = get_div_height($fake, is_last_page);
        if (height > page_height) {
            index_para = index;
            return false;
        }
    });
    return index_para == 0 ? -1 : index_para;
}
function paginate(container, page_width, page_height, contents) {
    var $fake = $("<div class='page active'></div>").appendTo(container);
    var paged = [];
    var index_from = 0;
    var index_para_from = -1;
    $fake.append(contents[0]);
    $fake.append(contents[1]);
    for (var i = 2; i < contents.length; i++) {
        $fake.append(contents[i]);
        var is_last_page = (i == contents.length - 1) var fake_height = get_div_height($fake, is_last_page);
        if (fake_height > page_height) {
            var start = index_para_from == -1 ? index_from: {
                ix: index_from,
                index_para1: index_para_from,
                index_para2: -1
            };
            var index_para_from = split_paragraph($fake, $(contents[i]), page_height, is_last_page);
            var end = index_para_from == -1 ? i: {
                ix: i,
                index_para1: 0,
                index_para2: index_para_from
            }
            $fake.empty();
            paged.push([start, end]);
            index_from = i;
            if (index_para_from == -1) {
                $fake.append(contents[i]);
            } else {
                var tmp = contents[i].clone();
                tmp.find('.sentence:lt(' + index_para_from + ')').remove();
                $fake.append(tmp);
            }
        }
    }
    var start = index_para_from == -1 ? index_from: {
        ix: index_from,
        index_para1: index_para_from,
        index_para2: -1
    };
    paged.push([start, i]);
    $fake.remove();
    return paged;
}
function parse_xml_one_page($container, content, notes) {
    var dom_list = convert_article_to_jqobjects(content, notes);
    _.each(dom_list,
    function(dom) {
        $container.append($(dom));
    });
}
function parse_xml($container, content, width, height, notes) {
    var contents = convert_article_to_jqobjects(content, notes);
    if (g_obj.data.intensity != 2) {
        contents.unshift($('#article-box .article-header'));
    }
    if (height < 500) {
        height = 500;
    }
    var paged = paginate($container.empty(), width, height, contents);
    var pages = paged.length;
    var paged_divs = $.map(paged,
    function(ixes, page_cur) {
        var index = page_cur + 1;
        var $div = $("<div class='page'></div>").attr('page', index).css({}).appendTo($container);
        var $page = $div;
        if (index == 1) $page.addClass('active');
        var start = ixes[0];
        var end = ixes[1];
        if (start.hasOwnProperty('index_para1')) {
            var index_para1 = start.index_para1;
            var i = start.ix;
            var $content = contents[i].clone();
            $content.find('.sentence:lt(' + index_para1 + ')').remove();
            $page.append($content);
            start_ix = i + 1;
        } else start_ix = start;
        if (end.hasOwnProperty('index_para2')) end_ix = end.ix;
        else end_ix = end;
        for (var i = start_ix; i < end_ix; i++) {
            $page.append(contents[i]);
        }
        if (end.hasOwnProperty('index_para2')) {
            var index_para2 = end.index_para2;
            var $content = contents[end.ix].clone();
            var $div = $('<div/>').addClass($content.attr('class')).attr('data', $content.attr('data')).append('<p></p>');
            $page.append($div);
            $div = $div.find('p');
            $div.append($content.find('.sentence:lt(' + index_para2 + ')'));
        }
        return $page;
    });
    return pages;
}
function convert_article_to_jqobjects(content, notes) {
    var xml = $.parseXML(content);
    var $tmp = $("<div/>");
    var contents = _.map(xml.getElementsByTagName("para"),
    function(para) {
        var p_id = $(para).attr('id');
        var img = para.getElementsByTagName("img");
        var subtitle = para.getElementsByTagName('subtitle');
        if (img.length) {
            img = img[0];
            var img_url = img.getElementsByTagName("url")[0].firstChild.nodeValue;
            var img_width = img.getElementsByTagName("width")[0].firstChild.nodeValue;
            var img_height = img.getElementsByTagName("height")[0].firstChild.nodeValue;
            var img_str = ["<div data='" + p_id + "' class='paragraph'><p><img src='", img_url, "' ></p></div>"].join('');
            if (img_width > 320) {
                img_height = img_height * 320 / img_width;
                img_width = 320;
                img_str = ["<div data='" + p_id + "' class='paragraph'><p><img src='", img_url, "' width='", img_width, "px' height='", img_height, "px' ></p></div>"].join('');
            }
            return img_str;
        }
        if (subtitle.length) {
            var title = subtitle[0].firstChild;
            var tag = title.nodeName;
            var text = title.firstChild.nodeValue;
            var p = ['<div class="paragraph" data="', p_id, '"><', tag, '>', text, '</', tag, '></div>'].join('');
            return p;
        }
        var paragraph = $.map(para.getElementsByTagName("sent"),
        function(sent) {
            if ($(sent).attr('class') == 'subtitle') return sent.firstChild.nodeValue;
            var sent_id = $(sent).attr('id');
            var sentence = $tmp.html(sent.firstChild.nodeValue).text();
            if (typeof g_variations_sentences != 'undefined') {
                $.each(sentence.split(" "),
                function(k, word) {
                    var word = word.match(/([a-zA-Z\-]{2,})/);
                    if (word) {
                        word = word[0].toLowerCase();
                        var t = typeof g_variations_sentences[word];
                        if (t == "undefined" || t == "function") {
                            g_variations_sentences[word] = [];
                        }
                        g_variations_sentences[word].push(sentence);
                    }
                });
            }
            var sentence = sentence.trim();
            if (sentence.length > 0) return "<span id='" + sent_id + "' class='sentence'>" + sentence + "</span>";
            return ""
        }).join(' ');
        if (paragraph) {
            if (notes && p_id in notes) {
                flag = "<i class='sf-icon-flag para-notes para-has-note' data='"
            } else {
                flag = "<i class='sf-icon-flag para-notes' data='"
            }
            paragraph = "<p>" + paragraph + flag + p_id + "' style='cursor: pointer'></i></p>";
        } else {
            paragraph = "<p>" + paragraph + "</p>";
        }
        return $("<div class='paragraph' data='" + p_id + "'></div>").html(paragraph);
    });
    return contents;
}
function insert_word_span() {
    var el = arguments[0] ? '#{0} .sentence'.format(arguments[0]) : 'span.sentence';
    $(el).each(function(s, sentence) {
        sentence = $(sentence).text();
        var words = [];
        _.each(sentence.split(" "),
        function(word, offset) {
            var matched_word = word.replace(/([\w\-.'’]+)/g, '<span offset=' + offset + '>$1</span>');
            words.push(matched_word);
        }) $(this).html(words.join(" "));
    });
}
function add_p_num() {
    var index = 0 $.each($('.paragraph'),
    function(i, v) {
        if ($('span', v).length > 1) {++index;
            $('p', v).prepend('<div class="muted-block"><span class="muted hide">' + index + '. </span></div>');
        }
    });
}
function push_unique(arr, item) {
    var i = $.inArray(item, arr);
    if (i == -1) arr.push(item);
    return i;
}
function push_unique_word(arr1, arr2, item) {
    var i = $.inArray(item.word, arr1);
    if (i === -1) {
        arr1.push(item.word);
        arr2.push(item);
    }
    return i;
}
function highlight(para, text, offset) {
    length = text.split(' ').filter(Boolean).length sents = $(para).find("span.sentence") var s_id = 0;
    for (; offset > parseInt($(sents[s_id]).find("[offset]").last().attr("offset"));) {
        offset -= parseInt($(sents[s_id]).find("[offset]").last().attr("offset")) + 1;
        s_id++;
    }
    var span = $(para).find('.sentence').eq(s_id).find("[offset=" + offset + "]") if ($(span).text() == '') {
        offset++;
        span = $(para).find('.sentence').eq(s_id).find("[offset=" + offset + "]")
    }
    text_first_word = text.split(' ')[0]
    if ($(span).text().indexOf(text_first_word) < 0) {
        if ($(span).next().text().indexOf(text_first_word) >= 0) {
            offset++;
        } else if ($(span).next().next().text().indexOf(text_first_word) >= 0) {
            offset += 2;
        } else if ($(span).prev().text().indexOf(text_first_word) >= 0) {
            offset--;
        } else if ($(span).prev().prev().text().indexOf(text_first_word) >= 0) {
            offset -= 2;
        } else if (s_id != sents.length - 1) {
            offset = 0;
            s_id++;
        }
    }
    for (var i = 0; i < length; i++) {
        var span = $(para).find('.sentence').eq(s_id).find("[offset=" + offset + "]") $(span).replaceWith($('<strong offset={0}>{1}</strong>'.format(offset, $(span).text()))) offset++;
    }
    return;
}
function get_url(name, d) {
    var url_str = URLS[name];
    if (url_str) {
        var url = $.tmpl(url_str, d).text();
    } else {
        var url = ""
    }
    return url
}
function getSelText() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt.toString();
}
function get_quiz_default(type_id, paragraph_gid) {
    var quiz_data = {
        'paragraph_gid': paragraph_gid,
        'sequence': 0,
        'quiz_type': type_id,
        'language_point': [],
        'choice_quiz_id': 0,
        'highlights': [],
        'is_fake': false
    };
    if (type_id != 7) {
        quiz_data.choices = [{
            'content': '',
            'code': 'A'
        },
        {
            'content': '',
            'code': 'B'
        },
        {
            'content': '',
            'code': 'C'
        },
        {
            'content': '',
            'code': 'D'
        }];
    } else {
        quiz_data.choices = [];
    }
    return quiz_data;
}
function edit_text(is_input, target) {
    var target_parent = target.parent();
    var text = target.html();
    var placeholder = target.attr('placeholder');
    var name = target.attr('name');
    if (is_input) {
        var html = '<input value="{0}" placeholder="{1}" name="{2}">'.format(text, placeholder, name);
    } else {
        var html = '<textarea placeholder="{0}" name="{1}">{2}</textarea>'.format(placeholder, name, text);
    }
    target.replaceWith(html);
    target_parent.children('input,textarea').focus().val("").val(text);
}
function disable_edit_text(text, target, is_span) {
    var placeholder = target.attr('placeholder');
    var name = target.attr('name');
    if ($.trim(text).length > 0) {
        if (is_span) {
            var html = '<span placeholder="{1}" name="{2}">{0}</span>'.format(text, placeholder, name);
        } else {
            var html = '<p placeholder="{1}" name="{2}">{0}</p>'.format(text, placeholder, name);
        }
        $(target).replaceWith(html);
    }
}
function get_current_max_sequence(quizzes_dict) {
    var max_sequence = _.max(_.map(quizzes_dict,
    function(quizzes) {
        var current_max_quiz = _.max(quizzes,
        function(quiz) {
            return quiz.sequence
        });
        return current_max_quiz ? current_max_quiz.sequence: 0;
    })) return max_sequence > 0 ? max_sequence: 0;
}
function change_copy_option_text(quiz_id) {
    var url = '/api/v1/read/article/quiz/{0}/choice/'.format(quiz_id);
    $.get(url,
    function(res) {
        if (res.status_code === 0) {
            var html = $('#copy-option-tmpl').tmpl({
                options: res.data
            });
            $('.options[choice-quiz-id={0}]'.format(quiz_id)).html(html);
        }
    });
}
function toggle_highlight(add, sentence_id, offset, text, toggle_class) {
    var el;
    var first_el = $('#{0} [offset={1}]'.format(sentence_id, offset));
    var selected_el = text.split(' ');
    var selected_el_len = selected_el.length;
    var modified_text;
    var that = this;
    var can_modify = arguments[5];
    for (var i = 0; i < selected_el_len; i++) {
        el = $('#{0} [offset={1}]'.format(sentence_id, offset));
        if (el.length === 0) {
            try {
                sentence_id = $('#{0}'.format(sentence_id)).next()[0].id;
            } catch(e) {
                sentence_id = 0;
            }
            if (sentence_id === 0) {
                alert('选择的第一个元素不能为空格');
                return false;
            }
            offset = 0;
            el = $('#{0} [offset={1}]'.format(sentence_id, offset));
        }
        if (can_modify) {
            if (selected_el[i] != el.html()) {
                selected_el[i] = el.html();
            }
        }
        if (add) {
            if (Object.prototype.toString.call(toggle_class) === '[object Array]') {
                _.each(toggle_class,
                function(ele) {
                    el.addClass(ele);
                });
            } else {
                el.addClass(toggle_class);
            }
        } else {
            if (Object.prototype.toString.call(toggle_class) === '[object Array]') {
                _.each(toggle_class,
                function(ele) {
                    el.removeClass(ele);
                });
            } else {
                el.removeClass(toggle_class);
            }
        }
        offset++;
    }
}
function create_delete_alert(text) {
    if (text === undefined) {
        text = '你确定要删除吗？';
    }
    var is_confirm = window.confirm(text);
    return is_confirm;
}
var trim_length = function(arr, len_en, len_cn) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+"),
    len = reg.test(arr) ? len_cn: len_en;
    if (arr.length > len) {
        arr = arr.slice(0, len - 2);
        arr = arr + '...';
    }
    return arr;
};
var QuizzesView = Backbone.View.extend({
    el: '#quizzes-container',
    events: {
        'click .submit-answer': 'submit_answer',
        'click .show-language-point': 'show_language_point'
    },
    initialize: function(options) {
        _.bindAll(this, 'render_quizzes', 'render_btn');
        this.type = QUIZZES_VIEW_TYPE;
        this.readonly = options.readonly;
        this.quiz_views = [];
        this.render_quizzes();
        this.render_extra_container();
        this.quizzes_type = options.quizzes_type;
        g_time_begin = new Date();
    },
    render_btn: function() {
        var html = $('#action-btn-tmpl').tmpl({
            'readonly': this.readonly,
            'type': this.type,
            'is_finished': false
        });
        this.$('#action-btn').html(html);
    },
    render_extra_container: function() {},
    render_quizzes: function() {
        var that = this;
        var group_end = 0;
        app.sorted_quizzes.each(function(quiz_model) {
            var quiz = quiz_model.toJSON();
            var quiz_group = quiz.group;
            if (_.isEmpty(quiz_group)) {
                var quiz_el = $('<div id="quiz-{0}" quiz-id="{1}" class="quiz type-{2}" paragraph-gid="{3}"></div>'.format(quiz.id, quiz.id, quiz.quiz_type, quiz.paragraph_gid));
                that.$('#quizzes').append(quiz_el);
                var data = {
                    'model': quiz_model,
                    'el': '#quiz-{0}'.format(quiz.id),
                    'readonly': that.readonly
                };
                if (quiz.quiz_type == g_quiz_type_cloze) {
                    var quiz_view = new ClozeQuizView(data);
                } else if (quiz.quiz_type == g_quiz_type_word_selection | quiz.quiz_type == g_quiz_type_sentence_selection) {
                    var quiz_view = new PassageCompletionQuizView(data);
                } else if (quiz.quiz_type == g_quiz_type_paragraph_title) {
                    var quiz_view = new MatchingHeadingsQuizView(data);
                } else if (quiz.quiz_type == g_quiz_type_insert_text) {
                    var quiz_view = new InsertTextQuizView(data);
                } else if (quiz.quiz_type == g_quiz_type_matching_paragraph_info) {
                    var quiz_view = new MatchingParagraphInfoQuizView(data);
                } else if (quiz.quiz_type == g_quiz_type_public_choices) {
                    var quiz_view = new PublicChoicesQuizView(data);
                } else {
                    var quiz_view = new QuizView(data);
                }
                that.quiz_views.push(quiz_view);
            } else {
                if (quiz.sequence > group_end) {
                    group_end = quiz_group.end;
                    var quiz_group_el = $('<div id="group-{0}" class="quiz-group"></div>'.format(quiz_group.id));
                    that.$('#quizzes').append(quiz_group_el);
                    var has_public_choices = false;
                    if (quiz.quiz_type == g_quiz_type_public_choices) {
                        has_public_choices = true;
                    }
                    var data = {
                        'model': new Backbone.Model(quiz_group),
                        'el': '#group-{0}'.format(quiz_group.id),
                        'readonly': that.readonly,
                        'has_public_choices': has_public_choices,
                        'type': that.type
                    };
                    new GroupView(data);
                }
            }
        });
    },
    submit_time: function() {
        var that = this;
        var data = {
            'operation': 'finish',
            'used_time': app.time_used
        };
        $.ajax({
            url: '/api/v1/read/article/user/' + app.article_id + '/',
            type: 'PUT',
            data: data,
            success: function() {
                that.set_answer_result();
            }
        });
    },
    set_answer_result: function() {
        var that = this;
        var answer_result = new AnswerResult();
        answer_result.fetch({
            data: {
                article_id: app.article_id
            },
            success: function(model, res) {
                if (res.status_code == 0) {
                    app.sorted_quizzes.each(function(quiz_model) {
                        var quiz = quiz_model.toJSON();
                        var target_answer = _.find(model.get('answers'),
                        function(answer) {
                            return answer[quiz.id] !== undefined
                        });
                        quiz_model.set('user_choice_ids', (target_answer && target_answer[quiz.id].split(',')) || []);
                    });
                    that.render_answer_result(model.toJSON());
                    _.each(that.quiz_views,
                    function(view) {
                        view.undelegateEvents();
                    });
                    that.quiz_views = [];
                    that.$('#quizzes').empty();
                    g_status.answered = true;
                    g_status.stage = 2;
                    app.article_content_view.add_highlight();
                    window.$('.para-notes').show();
                    if (that.is_uniq_type(that.quizzes_type) & g_obj.data.quiz_type !== g_quiz_type_insert_text) {
                        that.show_language_point();
                    } else {
                        that.render_quizzes();
                    }
                }
            }
        });
    },
    is_uniq_type: function(type) {
        return _.contains(g_quiz_uniq_types, type);
    },
    submit_answer: function(e) {
        var no_checked_exits = false;
        app.time_used = app.timer_view.get_time();
        $('.quiz .quiz-choices').each(function(index, dom) {
            if ($(dom).find('.choice input:checked').length === 0) {
                no_checked_exits = true;
                return;
            }
        });
        if (no_checked_exits) {
            this.$('.alerts.need-complete .alert').fadeIn().delay(1000).fadeOut();
            return;
        }
        if (app.time_used <= 60) {
            this.$('.alerts.too-fast .alert').fadeIn().delay(1000).fadeOut();
            return;
        }
        app.time_used = app.timer_view.stop();
        var that = this;
        this.readonly = true;
        this.render_btn();
        this.submit_time();
    },
    render_answer_result: function(answer_result) {
        var html = $('#answer-result-tmpl').tmpl({
            answer_result: answer_result
        });
        this.$('#answer-result').html(html);
    },
    show_language_point: function() {
        new QuizzesStartView({
            'readonly': true,
            'type': LANGUAGE_POINTS_VIEW_TYPE
        });
    }
});
var QuizView = Backbone.View.extend({
    events: {
        'click .choice input': 'choose_answer',
        'click .choice .choice-code': 'click_content_to_choose',
        'click .choice .choice-content': 'click_content_to_choose'
    },
    initialize: function(options) {
        _.bindAll(this, 'echo_answer', 'echo_highlight', 'hide_highlight');
        this.readonly = options.readonly;
        var quiz_type = this.model.get('quiz_type');
        if ($.inArray(quiz_type, g_article_reading_comprehension_quizzies) != -1 && quiz_type != g_quiz_type_insert_text) {
            this.$el.on('hover', this.echo_highlight);
            this.$el.on('mouseleave', this.hide_highlight);
        }
        this.render();
    },
    render: function() {
        this.quiz_type_info = g_quiz_types[this.model.toJSON().quiz_type - 1];
        var html = $('#quiz-tmpl').tmpl({
            'quiz': this.model.toJSON(),
            'readonly': this.readonly,
            'quiz_type_info': this.quiz_type_info
        });
        this.$el.html(html);
        this.echo_highlight();
    },
    echo_highlight: function(e) {
        if (!e) return;
        var quiz = this.model.toJSON();
        _.each(quiz.paragraph_gid.split(','),
        function(object_id) {
            $('.paragraph[data="{0}"]'.format(object_id)).addClass('active');
        });
        if (quiz.object_id.length > 0 && quiz.object_id != 'A' + app.article_id) {
            _.each(quiz.highlights,
            function(highlight) {
                toggle_highlight(true, highlight.sentence_id, highlight.sentence_offset, highlight.text, "quiz-highlight");
            });
        }
    },
    hide_highlight: function() {
        var quiz = this.model.toJSON();
        _.each(quiz.paragraph_gid.split(','),
        function(object_id) {
            $('.paragraph[data="{0}"]'.format(object_id)).removeClass('active');
        });
        if (quiz.object_id.length > 0 && quiz.object_id != 'A' + app.article_id) {
            _.each(quiz.highlights,
            function(highlight) {
                toggle_highlight(false, highlight.sentence_id, highlight.sentence_offset, highlight.text, "quiz-highlight");
            });
        }
    },
    choose_answer: function(e) {
        e.stopPropagation();
        if (!this.readonly) {
            var that = this;
            var user_answers = this.get_all_answers();
            if (user_answers.answer.code.length != 0) {
                var answer = new Answer();
                answer.save({
                    'answer': user_answers.answers_id_str,
                    'quiz_id': this.model.get('id')
                },
                {
                    success: function(model, res) {
                        that.echo_answer(user_answers.answer);
                        that.model.set('is_correct', res.data.is_correct);
                    }
                });
            }
        }
    },
    get_all_answers: function() {
        var answer = {
            'code': '',
            'content': ''
        };
        var answers_id_arr = [];
        _.each(this.$('input:checked'),
        function(dom) {
            answers_id_arr.push($(dom).val());
            var user_answer_code = $(dom).parent().find('.choice-code').text();
            var user_answer_content = $(dom).parent().find('.choice-content').text();
            answer.code = user_answer_code;
            answer.content = user_answer_content;
        });
        return {
            'answers_id_str': answers_id_arr.join(','),
            'answer': answer
        };
    },
    click_content_to_choose: function(e) {
        e.stopPropagation();
        if (!this.readonly) {
            var target = $(e.currentTarget);
            target.parent().find('input').prop('checked', true);
            this.choose_answer(e);
        }
    },
    echo_answer: function(answer) {}
});
QuizzesView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
QuizView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
var LanguagePointsView = Backbone.View.extend({
    el: '#language-points-container',
    events: {
        'click .finish-quizzes': 'finish_quizzes'
    },
    initialize: function(options) {
        _.bindAll(this, 'render_language_points');
        this.type = LANGUAGE_POINTS_VIEW_TYPE;
        this.readonly = true;
        this.quizzes_type = options.quizzes_type;
        var that = this;
        this.data_ready_count = 0;
        this.answer_result = new AnswerResult();
        this.answer_result.fetch({
            data: {
                article_id: app.article_id
            },
            success: function(model, res) {
                if (res.status_code == 0) {
                    that.data_ready_count++;
                    that.render_language_points_container();
                }
            }
        });
        this.article_language_point = new LanguagePoint();
        this.article_language_point.fetch({
            data: {
                'object_id': app.article_id,
                'type': 1
            },
            success: function(model, res) {
                that.data_ready_count++;
                that.render_language_points_container();
            }
        });
    },
    is_uniq_type: function(type) {
        return _.contains(g_quiz_uniq_types, type);
    },
    render_language_points_container: function() {
        if (this.data_ready_count == 2) {
            var data = {
                'answer_result': this.answer_result.toJSON(),
                'article_language_point': this.article_language_point.toJSON(),
                'type': this.type,
                'is_finished': g_obj.data.is_finished,
                'is_uniq_type': this.is_uniq_type(this.quizzes_type),
                'quizzes_type': this.quizzes_type
            };
            var html = $('#language-points-tmpl').tmpl(data);
            this.$el.html(html);
            this.render_language_points();
        }
    },
    render_language_points: function() {
        var that = this;
        var group_end = 0;
        this.tabs_count = 0;
        app.sorted_quizzes.each(function(quiz_model, index) {
            var quiz = quiz_model.toJSON();
            var quiz_group = quiz.group;
            if (_.isEmpty(quiz_group)) {
                that.tabs_count++;
                var language_point = quiz.language_point[0];
                var language_point_el = $('<div id="language-point-{0}" class="language-point language-point-tab type-{1}" sequence="{2}" tab="{3}">'.format(language_point.id, quiz.quiz_type, quiz.sequence, that.tabs_count));
                this.$('.language-points').append(language_point_el);
                var language_point_model = new Quiz(quiz);
                var data = {
                    'model': language_point_model,
                    'el': '#language-point-{0}'.format(language_point.id),
                    'readonly': that.readonly
                };
                if (quiz.quiz_type === 1) {
                    new ClozeLanguagePointView(data);
                } else if (quiz.quiz_type === 3 | quiz.quiz_type === 8) {
                    new PassageCompletionLanguagePointView(data);
                } else if (quiz.quiz_type === 5) {
                    new MatchingHeadingsLanguagePointView(data);
                } else if (quiz.quiz_type === g_quiz_type_insert_text) {
                    new InsertTextLanguagePointView(data);
                } else if (quiz.quiz_type === g_quiz_type_matching_paragraph_info) {
                    new MatchingParagraphInfoLanguagePointView(data);
                } else {
                    new LanguagePointView(data);
                }
            } else {
                if (quiz.sequence > group_end) {
                    that.tabs_count++;
                    group_end = quiz_group.end;
                    var language_point_group_el = $('<div id="group-{0}" class="language-point-group language-point-tab active" tab="{1}"></div>'.format(quiz_group.id, that.tabs_count));
                    that.$('.language-points').append(language_point_group_el);
                    var has_public_choices = false;
                    if (quiz.quiz_type == g_quiz_type_public_choices) {
                        has_public_choices = true;
                    }
                    var data = {
                        'model': new Backbone.Model(quiz_group),
                        'el': '#group-{0}'.format(quiz_group.id),
                        'readonly': that.readonly,
                        'has_public_choices': has_public_choices,
                        'type': that.type
                    };
                    new GroupView(data);
                }
            }
        });
    },
    finish_quizzes: function() {
        $('#quizzes-or-language-points').hide();
        $('.article-content').removeClass('subfield');
        new FinalView({
            'time': app.time_used
        });
    }
});
var LanguagePointView = Backbone.View.extend({
    initialize: function(options) {
        this.readonly = options.readonly;
        this.render();
    },
    render: function() {
        this.quiz_type_info = g_quiz_types[this.model.toJSON().quiz_type - 1];
        var html = $('#language-point-tmpl').tmpl({
            'quiz': this.model.toJSON(),
            'readonly': this.readonly,
            'quiz_type_info': this.quiz_type_info
        });
        this.$el.html(html);
    }
});
LanguagePointsView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
LanguagePointView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
var GroupView = Backbone.View.extend({
    initialize: function(options) {
        this.readonly = options.readonly;
        this.has_public_choices = options.has_public_choices;
        this.group_quizzes = this.filt_group_quizzes();
        this.type = options.type;
        this.render();
    },
    render: function() {
        var html = $('#group-tmpl').tmpl(this.model.toJSON());
        this.$el.html(html);
        if (this.type == QUIZZES_VIEW_TYPE) {
            this.$el.append($('<div class="group-quizzes group-container"></div>'));
            this.render_group_quizzes();
        } else {
            this.$el.append($('<div class="group-language-points group-container"></div>'));
            this.render_group_language_points();
        }
        if (this.has_public_choices) {
            this.render_public_choices();
        }
    },
    render_public_choices: function() {
        var public_choices = this.group_quizzes[0].get('choices');
        var html = $('#public-choices-tmpl').tmpl({
            'choices': public_choices
        });
        this.$('.group-container').before(html);
    },
    filt_group_quizzes: function() {
        var that = this;
        var group_quizzes = app.sorted_quizzes.filter(function(quiz_model) {
            return quiz_model.get('sequence') >= that.model.get('start') && quiz_model.get('sequence') <= that.model.get('end');
        }) return group_quizzes;
    },
    render_group_quizzes: function() {
        var that = this;
        _.each(this.group_quizzes,
        function(quiz_model) {
            var quiz = quiz_model.toJSON();
            var quiz_el = $('<div id="quiz-{0}" quiz-id="{1}" class="quiz type-{2}" paragraph-gid="{3}"></div>'.format(quiz.id, quiz.id, quiz.quiz_type, quiz.paragraph_gid));
            var data = {
                'model': quiz_model,
                'el': '#quiz-{0}'.format(quiz.id),
                'readonly': that.readonly
            };
            that.$('.group-quizzes').append(quiz_el);
            if (quiz.quiz_type == g_quiz_type_insert_text) {
                var quiz_view = new InsertTextQuizView(data);
            } else if (quiz.quiz_type == g_quiz_type_public_choices) {
                var quiz_view = new PublicChoicesQuizView(data);
            } else if (quiz.quiz_type == g_quiz_type_matching_paragraph_info) {
                var quiz_view = new MatchingParagraphInfoQuizView(data);
            } else {
                var quiz_view = new QuizView(data);
            }
        });
    },
    render_group_language_points: function() {
        var that = this;
        _.each(this.group_quizzes,
        function(quiz_model) {
            var quiz = quiz_model.toJSON();
            var language_point = quiz.language_point[0];
            var language_point_el = $('<div id="language-point-{0}" class="language-point type-{1}" sequence="{2}">'.format(language_point.id, quiz.quiz_type, quiz.sequence));
            that.$('.group-language-points').append(language_point_el);
            var language_point_model = new Quiz(quiz);
            var data = {
                'model': language_point_model,
                'el': '#language-point-{0}'.format(language_point.id),
                'readonly': that.readonly
            };
            if (quiz.quiz_type === g_quiz_type_insert_text) {
                new InsertTextLanguagePointView(data);
            } else if (quiz.quiz_type === g_quiz_type_public_choices) {
                new PublicChoicesLanguagePointView(data);
            } else if (quiz.quiz_type == g_quiz_type_matching_paragraph_info) {
                new MatchingParagraphInfoLanguagePointView(data);
            } else {
                new LanguagePointView(data);
            }
        });
    }
});
var ClozeQuizView = QuizView.extend({
    initialize: function() {
        QuizView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.hide_choices();
    },
    events: {
        'hover .quiz-sequence': 'show_choices',
        'mouseleave .quiz-choices': 'hide_choices',
        'click .choice': 'click_choice_to_choose'
    },
    echo_highlight: function() {
        this.data = this.model.toJSON();
        var highlight = this.data.highlights[0],
        highlight_el,
        position;
        if (typeof(highlight) !== 'undefined') {
            toggle_highlight(true, highlight.sentence_id, highlight.sentence_offset, highlight.text, ['quiz-' + this.model.id]);
            highlight_el = $('.quiz-' + this.model.id);
            highlight_el.html('');
            $(highlight_el[0]).replaceWith(this.$el);
            this.$el.attr('offset', $(highlight_el[0]).attr('offset'));
        }
    },
    show_choices: function(e) {
        $('.quiz .quiz-form').hide();
        this.$('.quiz-form').show();
        this.adjust_position();
    },
    adjust_position: function() {},
    hide_choices: function() {
        this.$('.quiz-form').hide();
        this.adjust_position();
    },
    click_choice_to_choose: function(e) {
        e.stopPropagation();
        var target = $(e.currentTarget);
        target.find('input').prop('checked', true);
        this.choose_answer(e);
    },
    choose_answer: function(e) {
        QuizView.prototype.choose_answer.apply(this, Array.prototype.slice.call(arguments));
        var target = $(e.currentTarget);
        this.$('.choice').removeClass('active');
        target.parent().addClass('active');
    },
    echo_answer: function(answer) {
        this.$('.quiz-sequence').html(answer.content);
        this.$('.quiz-sequence').addClass('choosen');
    }
});
var ClozeLanguagePointView = LanguagePointView.extend({
    initialize: function() {
        LanguagePointView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    events: {
        'hover .quiz-sequence': 'show_language_point',
        'mouseleave .quiz-correct-answer-container': 'hide_language_point'
    },
    render: function() {
        this.data = this.model.toJSON();
        var highlight = this.data.highlights[0],
        html = $('#cloze-language-point-tmpl').tmpl({
            'quiz': this.data,
            'readonly': this.readonly
        }),
        highlight_el,
        position;
        this.$el.html(html);
        if (typeof(highlight) !== 'undefined') {
            toggle_highlight(true, highlight.sentence_id, highlight.sentence_offset, highlight.text, ['quiz-' + this.model.id]);
            highlight_el = $('.quiz-' + this.model.id);
            highlight_el.html('');
            $(highlight_el[0]).replaceWith(this.$el);
        }
        this.$('.language-point-content>p:first-child').hide();
        this.hide_language_point();
        this.show_user_answer();
        this.set_tri_position();
    },
    set_tri_position: function() {
        var sequence_el = this.$('.quiz-sequence');
        var relative_el = $('#article-box');
        var position = {};
        position.left = sequence_el.offset().left - relative_el.offset().left - 20;
        this.$('.tri-top').css(position);
    },
    show_user_answer: function() {
        var user_answer = this.$('.user-answer').html(),
        answer = this.$('.answer').html();
        this.$('.quiz-sequence').html(user_answer);
        if (answer === user_answer) {
            this.$('.quiz-sequence').addClass('correct');
        }
    },
    show_language_point: function() {
        $('.language-point-content').hide();
        this.$('.language-point-content').show();
    },
    hide_language_point: function() {
        this.$('.language-point-content').hide();
    },
});
var PassageCompletionQuizView = ClozeQuizView.extend({
    initialize: function() {
        ClozeQuizView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        ClozeQuizView.prototype.render.apply(this, Array.prototype.slice.call(arguments));
        var el = $('#passage-completion-options');
        if (el.length == 0) {
            $('.article-paragraphs .page').prepend('<div id="passage-completion-options"></div>');
            el = $('#passage-completion-options');
            el.html(this.$('.quiz-form').outerHTML());
            el.addClass('type-' + this.data.quiz_type);
        }
        this.set_tri_position();
    },
    set_tri_position: function() {
        var sequence_el = this.$('.quiz-sequence');
        var relative_el = $('#article-box');
        var position = {};
        position.left = sequence_el.offset().left - relative_el.offset().left - 20;
        this.$('.tri-top').css(position);
    },
    adjust_position: function() {
        var form_selector = '#quiz-{0} .quiz-form ul'.format([this.model.id]) var quiz_top = $('#quiz-' + this.model.id).offset().top;
        var form_height = $(form_selector).height();
        var li_height = 0;
        _.each($(form_selector).find('li'),
        function(dom, index) {
            if ($(dom).height() > li_height) {
                li_height = $(dom).height();
            }
        });
        if (form_height > 0) {
            var missing_height = 50 + li_height + quiz_top + form_height - $(document).height();
            if (missing_height > 0) {
                $('#article-box .page').css('margin-bottom', '{0}px'.format([30 + missing_height]));
            }
        } else {
            $('#article-box .page').css('margin-bottom', '30px');
        }
    },
});
var PassageCompletionLanguagePointView = ClozeLanguagePointView.extend({
    initialize: function() {
        ClozeLanguagePointView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
});
var ParagraphSortingQuizzesView = QuizzesView.extend({
    el: '#paragraph-sorting',
    events: {
        'click .cancel-answer': 'cancel_answer',
        'click .submit-answer': 'submit_answer'
    },
    initialize: function(options) {
        this.quizzes_type = options.quizzes_type;
        this.ready_data();
        this.render();
        this.drag_choice();
        this.timer_view = new TimerView(app.test_info.time);
        g_time_begin = new Date();
    },
    ready_data: function() {
        var that = this;
        this.quizzes = app.sorted_quizzes.toJSON();
        this.choices = this.quizzes[0].choices.slice(0);
        this.fake_choices = [];
        _.each(this.choices,
        function(choice) {
            choice.is_fake = false;
        });
        _.each(this.quizzes,
        function(quiz, index) {
            if (quiz.is_fake) {
                _.each(quiz.choices,
                function(choice, index) {
                    if (choice.is_answer) {
                        quiz.content = choice.content;
                        quiz.code = choice.code;
                        that.choices[index].is_fake = true;
                    }
                })
            } else {
                quiz.code = '';
            }
            that.fake_choices.push(quiz);
        });
    },
    render: function() {
        var html = $('#paragraph-sorting-tmpl').tmpl({
            choices: this.choices,
            fake_choices: this.fake_choices
        });
        this.$el.html(html);
        this.$el.show();
    },
    drag_choice: function() {
        var that = this;
        this.$('.draggable').draggable({
            revert: true,
            start: function(e) {
                $(this).addClass('drag');
            },
            stop: function() {
                $(this).removeClass('drag');
            }
        });
        this.$('.no-choice').droppable({
            accept: '.draggable',
            tolerance: 'touch',
            drop: function(e, ui) {
                var drag_el = ui.draggable;
                that.choose_answer(drag_el, $(this));
            },
            over: function(e) {
                $(this).addClass('over');
                $('.no-choice.over').removeClass('selected');
                $($('.no-choice.over')[0]).addClass('selected');
            },
            out: function(e) {
                $(this).removeClass('over');
                $(this).removeClass('selected');
                $($('.no-choice.over')[0]).addClass('selected');
            }
        });
    },
    choose_answer: function(drag_el, drop_el) {
        if (drop_el.is('.selected')) {
            var code = drag_el.find('.code').html(),
            choice_id = drag_el.attr('choice_id'),
            sequence = drop_el.attr('sequence'),
            current_choices_el = $('.current-choices .code[sequence={0}]'.format(sequence));
            drag_el.hide();
            drag_el.attr('sequence', sequence);
            drop_el.removeClass('no-choice over selected');
            drop_el.droppable("option", {
                disabled: true
            });
            drop_el.html(drag_el.html());
            drop_el.find('.cancel-answer').show();
            drop_el.find('.choice-content>div').addClass('dashed');
            current_choices_el.html(code);
            current_choices_el.attr('choice_id', choice_id);
            $('.over').removeClass('over');
        }
    },
    cancel_answer: function(e) {
        var target = $(e.currentTarget),
        choice = target.parents('.choice'),
        sequence = parseInt(choice.attr('sequence')),
        hint_html = $('#drag-hint-tmpl').tmpl();
        choice.addClass('no-choice').html(hint_html);
        choice.droppable("option", {
            disabled: false
        });
        $('.choices-part .choice[sequence={0}]'.format(sequence)).show();
        $('.current-choices .code[sequence={0}]'.format(sequence)).html('').attr('choice_id', '');
    },
    submit_answer: function() {
        var answer = new Answer(),
        current_answers,
        is_complete,
        answers;
        var that = this;
        current_answers = this.get_answers();
        is_complete = current_answers.is_complete;
        answers = current_answers.answers;
        if (!is_complete) {
            this.$('.alerts.need-complete .alert').fadeIn().delay(1000).fadeOut();
            return;
        }
        app.time_used = app.timer_view.get_time();
        if (app.time_used <= 60) {
            this.$('.alerts.too-fast .alert').fadeIn().delay(1000).fadeOut();
            return;
        }
        $.post('/api/v1/read/article/answers/', answers,
        function(res) {
            $('.paragraph').show();
            that.$el.hide();
            that.readonly = true;
            that.submit_time();
        });
    },
    get_answers: function() {
        var that = this,
        answer_el = $('.current-choices .code'),
        answers = {},
        is_complete = true;
        answer_el.each(function() {
            var quiz_id = $(this).attr('quiz_id'),
            is_fake = $(this).attr('is_fake'),
            choice_id = $(this).attr('choice_id');
            if (is_fake === 'false') {
                if (choice_id === '' | choice_id === undefined) {
                    is_complete = false;
                } else {
                    answers[quiz_id] = choice_id;
                }
            }
        });
        return {
            is_complete: is_complete,
            answers: answers
        }
    }
});
var ParagraphSortingLanguagePointsView = LanguagePointsView.extend({
    initialize: function() {
        LanguagePointsView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render_language_points: function() {
        this.render_user_answers();
        this.render_answers();
    },
    render_user_answers: function() {
        var that = this;
        app.sorted_quizzes.each(function(quiz_model) {
            that.set_user_answer_code(quiz_model);
        });
        var html = $('#paragraph-sorting-user-answers-tmpl').tmpl({
            'quizzes': app.sorted_quizzes.toJSON()
        });
        this.$('.paragraph-sorting-user-answers').html(html);
    },
    render_answers: function() {
        var html = $('#paragraph-sorting-answers-tmpl').tmpl({
            'quizzes': app.sorted_quizzes.toJSON()
        });
        this.$('.paragraph-sorting-answers').html(html);
    },
    set_user_answer_code: function(quiz_model) {
        var that = this;
        if (quiz_model.get('is_fake')) {
            quiz_model.set('user_answer_code', quiz_model.get('answer_code'));
            return;
        }
        _.each(quiz_model.get('user_choice_ids'),
        function(id) {
            var target_choice = _.find(quiz_model.get('choices'),
            function(choice) {
                return choice.id == id;
            });
            var code = (target_choice && target_choice.code) || '';
            quiz_model.set('user_answer_code', code);
        });
    }
});
var InsertTextQuizView = QuizView.extend({
    initialize: function() {
        QuizView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    events: {
        'click .position-insert': 'insert_position'
    },
    render: function() {
        QuizView.prototype.render.apply(this, Array.prototype.slice.call(arguments));
        this.render_extra_part();
    },
    render_extra_part: function() {
        this.$('.quiz-form').hide();
        this.sentence_html = this.$('.quiz-stem').html();
        this.user_answer_index = this.$('.choice').index(this.$('.user-answer'));
        this.answer_index = this.$('.choice').index(this.$('.answer'));
        this.user_answer_el = this.$('.position-insert:eq({0})'.format(this.user_answer_index));
        this.answer_el = this.$('.position-insert:eq({0})'.format(this.answer_index));
        var stem_html = '请问下面这句话应该放在引用段落的哪个位置？点击引用段落中的黑色方块把句子放到对应位置。句子内容：' + '<span class="sentence">' + this.sentence_html + '</span>';
        this.$('.quiz-stem').html(stem_html);
        if (this.options.readonly) {
            this.echo_correct_answer();
        } else {
            this.echo_user_answer(this.user_answer_el);
        }
    },
    echo_highlight: function() {
        var that = this,
        latest_echo_quiz_id = this.echo_paragraph(false);
        this.data = this.model.toJSON();
        if (!this.has_echoed) {
            _.each(this.data.highlights,
            function(highlight) {
                that.show_insert_position(highlight.sentence_id + '_' + latest_echo_quiz_id, highlight.sentence_offset, highlight.text);
            });
            this.has_echoed = true;
        }
    },
    echo_paragraph: function() {
        var quiz = this.model.toJSON();
        var that = this;
        if (quiz.object_id.length > 0 && quiz.object_id != 'A' + app.article_id) {
            var has_near_echo = false,
            current_quiz = this.$el,
            latest_echo_quiz_id;
            latest_echo_quiz_id = quiz.id;
            if (!has_near_echo) {
                _.each(quiz.paragraph_gid.split(','),
                function(object_id) {
                    var para_seq = $('.paragraph[data="{0}"] span.muted'.format(object_id)).text().substr(0, 1);
                    var para_html = $('.paragraph[data="{0}"]'.format(object_id)).html();
                    var html = $('#paragraph-text-tmpl').tmpl({
                        'para_seq': para_seq,
                        'para_html': para_html,
                        'para_id': object_id
                    });
                    that.$('.echo-paragraph').append(html);
                    _.each(that.$('.paragraph-text span[id^="A{0}"]'.format(app.article_id)),
                    function(dom) {
                        var sentence_id = $(dom).attr('id');
                        $(dom).attr('id', sentence_id + '_' + quiz.id);
                    });
                });
            }
            return latest_echo_quiz_id;
        }
    },
    echo_correct_answer: function() {
        var insert_sentence_html = '<span class="correct insert_sentence">' + this.sentence_html + '</span>'this.user_answer_el.addClass('user-answer');
        this.answer_el.addClass('answer');
        this.answer_el.after(insert_sentence_html);
    },
    echo_user_answer: function(target) {
        this.$('.position-insert').show();
        this.$('.insert_sentence').remove();
        target.hide();
        target.after('<span class="insert_sentence">' + this.sentence_html + '</span>');
    },
    show_insert_position: function(sentence_id, offset, text) {
        var html = '<span class="position-insert position-insert-{0}" position={0}></span>'.format(text);
        if (offset == -1) {
            $('#' + sentence_id).before(html);
        } else {
            $('#' + sentence_id).after(html);
        }
    },
    insert_position: function(e) {
        var target = $(e.currentTarget),
        position = target.attr('position'),
        input = this.$('.choice:eq({0}) input'.format(position - 1));
        input.trigger('click');
        this.echo_user_answer(target);
    },
});
var InsertTextLanguagePointView = InsertTextQuizView.extend({
    initialize: function() {
        InsertTextQuizView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        this.data = this.model.toJSON();
        this.get_answer_content();
        this.quiz_type_info = g_quiz_types[this.model.toJSON().quiz_type - 1];
        var html = $('#language-point-tmpl').tmpl({
            'quiz': this.data,
            'readonly': this.readonly,
            'quiz_type_info': this.quiz_type_info
        });
        this.$el.html(html);
        this.echo_highlight();
        this.render_extra_part();
        this.set_position_disabled();
    },
    get_answer_content: function() {
        var that = this;
        _.each(this.data.choices,
        function(choice) {
            if (choice.is_answer) {
                that.data.answer_content = choice.content;
            }
        });
    },
    echo_highlight: function() {
        InsertTextQuizView.prototype.echo_highlight.apply(this, Array.prototype.slice.call(arguments));
    },
    set_position_disabled: function() {
        this.$('.position-insert').addClass('position-disabled');
    }
});
MatchingHeadingsQuizView = QuizView.extend({
    events: {
        'click .quiz-title': 'toggle_choices',
        'click .choice': 'click_item_to_choose'
    },
    initialize: function() {
        QuizView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        QuizView.prototype.render.apply(this, Array.prototype.slice.call(arguments));
        var answer = this.get_user_answer();
        if (answer.code.length != 0) {
            this.echo_answer(answer);
        }
        this.$('.quiz-choices').hide();
        this.highlight_paragraph_code();
    },
    echo_highlight: function() {
        this.set_quiz_pos();
    },
    highlight_paragraph_code: function() {},
    set_quiz_pos: function() {
        $('.paragraph[data="{0}"]'.format(this.model.get('object_id'))).before(this.$el);
    },
    toggle_choices: function() {
        this.$('.quiz-choices').toggle();
    },
    echo_answer: function(answer) {
        this.$('.quiz-stem').text('[' + answer.code + ']' + ':' + answer.content);
        this.$('.quiz-choices').hide();
    },
    get_user_answer: function() {
        var answer = {
            'code': '',
            'content': ''
        };
        var that = this;
        _.each(this.model.get('user_choice_ids'),
        function(id) {
            var target_choice = _.find(that.model.get('choices'),
            function(choice) {
                return choice.id == id;
            });
            var code = (target_choice && target_choice.code) || "";
            var content = (target_choice && target_choice.content) || "";
            answer.code = code;
            answer.content = content;
        });
        return answer;
    },
    click_item_to_choose: function(e) {
        var target = $(e.currentTarget);
        target.find('input').prop('checked', true);
        this.choose_answer(e);
    }
});
var MatchingHeadingsLanguagePointView = LanguagePointView.extend({
    events: {
        'click .quiz-title': 'toggle_language_point'
    },
    initialize: function() {
        LanguagePointView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        var html = $('#flexible-language-point-tmpl').tmpl({
            'quiz': this.model.toJSON(),
            'readonly': this.readonly
        });
        this.$el.html(html);
        var answer = this.get_user_answer();
        this.echo_answer(answer);
        this.adjust_language_point();
    },
    adjust_language_point: function() {
        var quiz_target = $('#quiz-{0}'.format(this.model.get('id')));
        if (quiz_target.length > 0) {
            $('.paragraph[data="{0}"]'.format(this.model.get('object_id'))).prev().remove();
        }
        $('.paragraph[data="{0}"]'.format(this.model.get('object_id'))).before(this.$el);
    },
    toggle_language_point: function() {
        this.$('.language-point-content').toggle();
    },
    echo_answer: function(answer) {
        this.$('.quiz-stem').text('[' + answer.code + ']' + ':' + answer.content);
        this.$('.language-point-content').hide();
    },
    get_user_answer: function() {
        var answer = {
            'code': '',
            'content': ''
        };
        var that = this;
        _.each(this.model.get('user_choice_ids'),
        function(id) {
            var target_choice = _.find(that.model.get('choices'),
            function(choice) {
                return choice.id == id;
            });
            var code = (target_choice && target_choice.code) || "";
            var content = (target_choice && target_choice.content) || "";
            answer.code = code;
            answer.content = content;
        });
        return answer;
    }
});
MatchingHeadingsQuizView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
MatchingHeadingsLanguagePointView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
MatchingParagraphInfoQuizView = MatchingHeadingsQuizView.extend({
    events: {
        'click .quiz-user-answer-container': 'toggle_choices'
    },
    set_quiz_pos: function() {
        this.highlight_paragraph_code();
    },
    highlight_paragraph_code: function() {
        _.each($('.paragraph p'),
        function(dom, index) {
            var first_span = $(dom).find('.sentence').eq(0).find('span').eq(0);
            if (first_span) {
                var text = first_span.text();
                if (text.length == 1 && text.match(/[a-z]/i) && text.toUpperCase() == text) {
                    first_span.css('font-weight', 'bold');
                }
            }
        });
    },
    echo_answer: function(answer) {
        this.$('.quiz-user-answer').text(answer.code);
        this.$('.quiz-choices').hide();
    }
});
var MatchingParagraphInfoLanguagePointView = MatchingHeadingsLanguagePointView.extend({
    events: {
        'click .quiz-user-answer-container': 'toggle_language_point'
    },
    adjust_language_point: function() {},
    echo_answer: function(answer) {
        this.$('.quiz-user-answer').text(answer.code);
    }
});
MatchingParagraphInfoQuizView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
MatchingParagraphInfoLanguagePointView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
var PublicChoicesQuizView = MatchingParagraphInfoQuizView.extend({});
var PublicChoicesLanguagePointView = MatchingParagraphInfoLanguagePointView.extend({});
var ArticleAudio = Backbone.Model.extend({
    url: '/api/v1/read/article/' + ARTICLEID + '/lrc/',
    getParagraphAudio: function(sentences) {
        var paragraphs = {};
        $(this).find($('.paragraph')).each(function() {
            var id = $(this).attr('data');
            var sentenceStart = $(this).find('.sentence:first-of-type').attr('id');
            var sentenceEnd = $(this).find('.sentence:last-of-type').attr('id');
            var start = _.find(sentences,
            function(sentence) {
                return sentence.id === sentenceStart
            });
            var end = _.find(sentences,
            function(sentence) {
                return sentence.id === sentenceEnd
            });
            if (paragraphs[id] && end) {
                paragraphs[id][1] = end.end;
            } else if (start && end) {
                paragraphs[id] = [start.start, end.end];
            }
        });
        return paragraphs;
    },
    parse: function(res) {
        var data = res.data;
        if (res.status_code === 0 && res.data.audio_addresses.length) {
            data.hasAudio = true;
            data.paragraphs = this.getParagraphAudio(res.data.sentences);
        } else {
            data = {
                hasAudio: false
            };
        }
        return data;
    }
});
var ArticleAudioView = Backbone.View.extend({
    el: '.main',
    events: {
        'click .enter-play-mode': 'enterPlayMode',
        'click .quit-play-mode': 'quitPlayMode',
        'click .play-paragraph-audio': 'playParagraphAudio',
        'click .stop-paragraph-audio': 'stopParagraphAudio'
    },
    initialize: function() {
        _.bindAll(this, 'render');
        this.model = new ArticleAudio();
        this.model.on('change', this.render);
        this.model.fetch();
    },
    render: function() {
        this.data = this.model.toJSON();
        if (this.data.hasAudio) {
            this.getReadSound();
            this.renderPlayModeBtn();
            $('.reader-nav .user-name').addClass('hide');
        }
    },
    getReadSound: function() {
        this.sound = soundManager.getSoundById("shanbay_audio");
        this.sound.url = this.data.audio_addresses[0];
    },
    renderPlayModeBtn: function() {
        $('.reader-nav .pull-right').append('<span class="enter-play-mode"><i class="icon-play-sign"></i><span>边听边看</span></span>');
    },
    quitPlayMode: function() {
        if (this.data.hasAudio) {
            $('.quit-play-mode').remove();
            $('.main').removeClass('hasAudio');
            $('.paragraph').removeClass('playing');
            this.renderPlayModeBtn();
            this.removePlayBtn();
            this.stopAudio();
        }
    },
    enterPlayMode: function() {
        if (this.data.hasAudio) {
            $('.main').addClass('hasAudio');
            $('.enter-play-mode').remove();
            var html = $('#quit-play-mode-tmpl').tmpl();
            $('.reader-nav .pull-right').append(html);
            this.convertAllPlayBtn();
            $('.page.active').find('.play-paragraph-audio')[0].click();
        }
    },
    removePlayBtn: function() {
        $('.play-paragraph-audio').remove();
        $('.stop-paragraph-audio').remove();
    },
    getPlayBtnHtml: function() {
        return $('#play-paragraph-audio-tmpl').tmpl();
    },
    convertAllPlayBtn: function() {
        var that = this;
        var ids = [];
        $('.paragraph').each(function() {
            var id = $(this).attr('data');
            if (ids.indexOf(id) === -1) {
                ids.push(id);
                if (that.data.paragraphs[id]) {
                    $('.paragraph[data=' + id + ']').removeClass('playing');
                    $(this).find('.stop-paragraph-audio').remove();
                    if ($(this).find('.play-paragraph-audio').length === 0) {
                        $(this).prepend(that.getPlayBtnHtml());
                    }
                }
            }
        });
    },
    playParagraph: function(startPoint, endPoint, paragraphId) {
        var that = this;
        if (endPoint) {
            this.sound.play({
                position: startPoint,
                onload: function() {
                    if (this.sound.readyState === 2 && this.sound.url !== this.data.audio_addresses[1]) {
                        this.sound.url = this.data.audio_addresses[1];
                        this.playParagraph(startPoint, endPoint, paragraphId);
                    }
                }.bind(this),
            });
            this.endPoint = endPoint;
            this.sound.onPosition(endPoint,
            function() {
                this.stop();
                this.clearOnPosition(endPoint);
                that.playNextParagraph(paragraphId);
            });
        }
    },
    playNextParagraph: function(id) {
        var paragraphIds = Object.keys(this.data.paragraphs);
        var index = paragraphIds.indexOf(id);
        var nextId = paragraphIds[index + 1];
        var nextParagraph = $('.paragraph[data=' + nextId + ']');
        if (nextParagraph.length) {
            nextParagraph = $(nextParagraph[0]);
            var page = $('.page.active').attr('page');
            var nextParagraphPage = nextParagraph.parents('.page').attr('page');
            if (page === nextParagraphPage) {
                clearTimeout(this.playDelay);
                this.playDelay = setTimeout(function() {
                    $(nextParagraph).find('.play-paragraph-audio').trigger('click');
                },
                500);
            } else {
                this.stopParagraphAudio();
            }
        } else {
            this.stopParagraphAudio();
        }
    },
    stopAudio: function() {
        this.sound.stop();
        this.sound.clearOnPosition(this.endPoint);
    },
    playParagraphAudio: function(e) {
        var target = $(e.currentTarget);
        var paragraph = target.parents('.paragraph');
        var id = paragraph.attr('data');
        this.stopParagraphAudio();
        target.remove();
        paragraph.prepend($('#stop-paragraph-audio-tmpl').tmpl());
        $('.paragraph[data=' + id + ']').addClass('playing');
        this.getReadSound();
        this.playParagraph(this.data.paragraphs[id][0], this.data.paragraphs[id][1], id);
    },
    stopParagraphAudio: function() {
        this.stopAudio();
        this.convertAllPlayBtn();
    },
});
var app = app || {};
var g_words_learning_all = [];
var g_words_unlearned = [];
var g_words_new = [];
var g_words_new_detail = [];
var g_articles = {};
var g_status = {
    stage: 1
};
var NOTES_IPP = 3;
var g_notes_total = 0;
var buy_collins_modal;
var elFixPosition = function(el) {
    var width = $(window).width();
    var boxWidth = $('#article-box').width();
    if (el.length) {
        el.css({
            left: (width + boxWidth) / 2 + 5
        });
    }
};
var sideBarFixPosition = function() {
    var sideBar = $('.articleSideBar');
    var paged = $('.article-content .paged');
    elFixPosition(sideBar);
    elFixPosition(paged);
};
window.addEventListener('resize',
function(event) {
    sideBarFixPosition();
});
var WordsCollection = Backbone.Collection.extend({
    url: function() {
        return get_url('article_words', {
            article_id: app.article_id,
            type: this.type
        });
    },
    initialize: function(models, options) {
        this.type = options['type'] || 'all';
        this.fetch();
    },
    parse: function(response) {
        data = response.data;
        return data;
    }
}) var HighlightView = Backbone.View.extend({
    el: '#highlight_words',
    initialize: function(options) {
        _.bindAll(this, 'highlight', 'check_data_ready', 'render', 'change_level', 'toggle_underline');
        this.silent_constructor = options.silent;
        this.context = options.context;
        this.data_check_count = 0;
        learningCollection = new WordsCollection({},
        {
            type: 'all'
        });
        unlearnedCollection = new WordsCollection({},
        {
            type: 'unlearned'
        });
        learningCollection.on('all', this.check_data_ready);
        unlearnedCollection.on('all', this.check_data_ready);
        this.words_variations = {};
    },
    check_data_ready: function() {
        this.data_check_count++;
        if (this.data_check_count >= 2) {
            this.render();
        }
    },
    render: function() {
        var that = this;
        g_words_learning_all = _.map(learningCollection.models,
        function(word) {
            return word.attributes.word
        });
        g_words_unlearned = _.map(unlearnedCollection.models,
        function(word) {
            return word.attributes.word
        });
        this.$('.highlight.new .number').text(g_words_unlearned.length);
        this.$('.highlight.learned .number').text(g_words_learning_all.length);
        _.each(learningCollection.models,
        function(vocab) {
            if (vocab.get('word')) {
                that.words_variations[vocab.get('word')] = vocab.get('variants');
            }
        });
        _.each(unlearnedCollection.models,
        function(vocab) {
            if (vocab.get('word')) {
                that.words_variations[vocab.get('word')] = vocab.get('variants');
            }
        });
        if (this.silent_constructor) {
            this.silent_constructor = false;
        } else {
            this.context.trigger('add_highlight');
        }
    },
    toggle_underline: function($target) {
        var source_words = g_words_unlearned;
        var clazz = 'unlearned';
        if ($target.hasClass('active')) {
            foreach_word(/.*/,
            function($word) {
                $word.removeClass(clazz);
            });
        } else {
            highlight_word(this.words_variations, source_words, clazz);
        }
        $target.toggleClass('active');
    },
    highlight: function(e) {
        e.preventDefault();
        target = $(e.currentTarget);
        target.find('.c').toggle();
        target.find('.s').toggle();
        if (target.hasClass('highlight_new')) {
            var clazz = 'unlearned';
            var source_words = g_words_unlearned;
        } else {
            var clazz = 'learning-all';
            var source_words = g_words_learning_all;
        }
        foreach_word(/.*/,
        function($word) {
            $word.removeClass(clazz);
        });
        if ($target.hasClass("active")) {
            $target.removeClass("active") return;
        } else {
            $target.addClass("active");
            highlight_word(this.words_variations, source_words, clazz)
        }
    },
    change_level: function(data) {
        unlearnedCollection.fetch();
    },
    remove: function() {
        this.undelegateEvents();
    }
});
var Content = Backbone.Model.extend({
    urlRoot: '/api/v1/read/article_content/'
});
var AppletModel = Backbone.Model.extend({
    url: function() {
        return '/api/v1/market/userapplet/applet/' + this.get('code_name') + '/';
    },
    parse: function(res) {
        return res.data.user_applet;
    }
});
var Annotation = Backbone.Model.extend({});
var Annotations = Backbone.Collection.extend({
    model: Annotation,
    urlRoot: '/api/v1/read/article/annotation/',
    parse: function(res) {
        data = res.data;
        return data;
    }
});
var Note = Backbone.Model.extend({
    rootUrl: '/api/v1/read/note/'
});
var NoteCollection = Backbone.Collection.extend({
    model: Note,
    url: '/api/v1/read/note/',
    parse: function(res) {
        g_notes_total = res.data.total;
        this.notes = res.data.notes;
        return this.notes;
    }
});
var NoteView = Backbone.View.extend({
    initialize: function() {
        this.$el = $("#article-note-" + this.model.id);
        this.events = {
            'click .enable-edit-note i': 'enable_edit_note',
            'click .edit-note i': 'edit_note',
            'click .like-note i': 'like_note'
        }
        this.render();
    },
    render: function() {
        this.note = this.model.toJSON();
        if (this.note.author.id == $.cookie('userid')) {
            this.note.is_my_note = true;
        } else {
            this.note.is_my_note = false;
        }
        this.$el.html($('#article-note-tmpl').tmpl(this.note));
    },
    enable_edit_note: function() {
        this.$('.note-content').replaceWith($('#edit-note'));
        $('#edit-note').show();
        $('.enable-edit-note').remove();
    },
    edit_note: function() {
        var that = this;
        var value = this.$('textarea').val();
        this.model.save({
            id: this.note.id,
            content: value
        },
        {
            success: function(model, res) {
                if (res.status_code == 0) {
                    $('.hint-success').fadeIn(1000);
                    $('.hint-success').fadeOut(1000,
                    function() {
                        that.model.set(res.data);
                        that.render();
                    });
                } else {
                    $('.hint-fail').fadeIn(1000);
                    $('.hint-fail').fadeOut(1000);
                }
            },
            wait: true
        });
    },
    like_note: function() {
        var that = this;
        var num_vote = ~~ (this.$('.like-note span').html());
        if (!this.$('.like-note').hasClass('note-liked')) {
            this.$('.like-note span').html(num_vote + 1);
            this.$('.like-note').addClass('note-liked');
            $.ajax({
                type: 'post',
                url: '/api/v1/read/note/vote/',
                data: {
                    'note_id': this.note.id,
                    'action': 'up'
                }
            }).done(function(res) {
                if (res.status == 0) {
                    that.$('.like-note span').html(res.data.num_vote);
                }
            })
        } else {
            this.$('.like-note span').html(num_vote - 1);
            this.$('.like-note').removeClass('note-liked');
            $.ajax({
                type: 'post',
                url: '/api/v1/read/note/vote/',
                data: {
                    'note_id': this.note.id,
                    'action': 'down'
                }
            }).done(function(res) {
                if (res.status == 0) {
                    that.$('.like-note span').html(res.data.num_vote);
                }
            })
        }
    }
}) var NotesView = Backbone.View.extend({
    el: '#article-notes-container',
    events: {
        'click .icon-plus': 'enable_add_note',
        'click .add-note': 'add_note',
        'click .left': 'left_page',
        'click .right': 'right_page',
        'click .close-notes i': 'close_notes'
    },
    initialize: function(options) {
        this.open = true;
        this.current_page = 1;
        this.flag = this.options['flag'];
        this.flag_position = this.flag.offset();
        this.para_id = this.flag.attr('data');
        this.flag_screen_y = this.options['flag_screen_y'] _.bindAll(this, 'render');
        this.$el.append('<div id="notes-wait"></div>');
        $('#notes-wait').html($('#notes-wait-tmpl').tmpl());
        this.tri_position_left = this.flag_position.left - ($(window).width() - $('.cabinet').width()) / 2;
        $('#article-notes-container .tri-top').css({
            left: this.tri_position_left + 16
        }) $('#article-notes-container').css({
            top: this.flag_position.top - 30
        }) this.collection = new NoteCollection();
        this.collection.on('reset', this.render);
        var url = this.collection.url + '?para_id=' + this.para_id + '&ipp=' + NOTES_IPP + '&page=' + this.current_page;
        this.collection.fetch({
            url: url
        });
    },
    render: function() {
        var that = this;
        this.collection.toJSON();
        this.collection.total = g_notes_total;
        this.collection.current_page = this.current_page;
        this.collection.total_page = ~~ ((this.collection.total - 1) / 3) + 1;
        this.collection.have_my_note = false;
        _.each(this.collection.models,
        function(note) {
            if (note.get('author').id == $.cookie('userid')) {
                that.collection.have_my_note = true;
            }
        });
        this.$el.html($('#article-notes-tmpl').tmpl(this.collection));
        this.collection.each(function(note) {
            new NoteView({
                model: note
            });
        });
        if ((this.$el.height() + this.flag_position.top - 40) > $('.cabinet').height()) {
            $('.cabinet').height(this.$el.height() + this.flag_position.top + 'px');
        }
        this.height = $('#article-box').height() - this.flag_position.top + 10;
        if (this.collection.total) {
            this.$('#article-notes').height(this.height);
        }
        $('#article-notes-container .tri-top').css({
            left: this.tri_position_left + 16
        }) this.rest_height = $(window).height() - this.flag_screen_y;
        if (this.rest_height < 300) {
            if (this.$el.height() > 300) {
                window.scrollBy(0, 300 - this.rest_height);
            } else {
                window.scrollBy(0, this.$el.height() - this.rest_height)
            }
        }
    },
    add_note: function() {
        var value = $('#article-notes textarea').val();
        var that = this;
        var postData = {
            article_id: app.article_id,
            para_id: this.para_id,
            content: value
        };
        this.collection.create(postData, {
            wait: true,
            success: function(model, res) {
                if (res.status_code == 0) {
                    $('.hint-success').fadeIn(1000);
                    $('.hint-success').fadeOut(1000,
                    function() {
                        that.open = false;
                        if (!that.flag.hasClass('para-has-note')) {
                            that.flag.addClass('para-has-note');
                        }
                        that.flag.trigger('click');
                    });
                } else {
                    $('.hint-fail').fadeIn(1000);
                    $('.hint-fail').fadeOut(1000);
                }
            }
        });
    },
    enable_add_note: function() {
        $('.icon-plus').remove();
        $('#add-note').show();
    },
    left_page: function() {
        if (!this.$('.left').hasClass('disable')) {
            this.current_page--;
            var url = this.collection.url + '?para_id=' + this.para_id + '&ipp=' + NOTES_IPP + '&page=' + this.current_page;
            this.collection.fetch({
                url: url
            });
        }
    },
    right_page: function() {
        if (!this.$('.right').hasClass('disable')) {
            this.current_page++;
            var url = this.collection.url + '?para_id=' + this.para_id + '&ipp=' + NOTES_IPP + '&page=' + this.current_page this.collection.fetch({
                url: url
            });
        }
    },
    close_notes: function() {
        this.$el.html(' ');
        this.open = false;
    }
}) var ArticleContentView = Backbone.View.extend({
    el: '.article-content',
    article_end_tmpl: '#article-end-tmpl',
    points_container_tmpl: '#points_container_tmpl',
    events: {
        'click span.sentence > span': 'query_word',
        'click span.sentence > strong': 'query_word',
        'click #finish-reading': 'finish_reading',
        'click a.my-answer': 'view_answer',
        'click a.like': 'like_article',
        'click .load-points': 'load_points',
        'mouseenter .paragraph p': 'hoverOn',
        'mouseleave .paragraph p': 'hoverOff',
        'click .paged .button': 'scroll_page',
        'click .weibo.revise': 'weibo_share',
        'hover .weixin.revise': 'weixin_qrcode',
        'click .para-notes': 'show_notes',
    },
    initialize: function() {
        this.cabinet_height = 0;
        this.$('.article-paragraphs').html($('#article-loading-tmpl').tmpl());
        _.bindAll(this, 'render', 'add_highlight', 'query_word', 'view_answer', 'like_article', 'scroll_page', 'finish_reading', 'load_points', 'hoverOn', 'hoverOff', 'remove');
        this.on('add_highlight', this.add_highlight);
        this.on('load_points', this.load_points);
        this.model.on('change', this.render);
        this.page_times = {};
        this.cache_words = {};
        this.cache_examples = {};
        this.cache_collins_def = {};
        this.sentence_annotation = {};
        this.sentence_annotation_offset = {};
        if (this.model.id in g_articles) {
            this.render();
        } else {
            var that = this;
            this.annotations = new Annotations();
            this.annotations.fetch({
                url: this.annotations.urlRoot + this.model.id,
                success: function() {
                    that.update_annotations();
                    that.render();
                }
            });
        }
    },
    update_annotations: function() {
        var that = this;
        _.each(this.annotations.models,
        function(annotation) {
            that.sentence_annotation[annotation.get('sentence_id')] = annotation.get('annotation');
            var tmp = {};
            _.each(annotation.get('annotation'),
            function(offsets, phrase) {
                _.each(offsets,
                function(offset) {
                    tmp[offset] = phrase;
                });
            });
            that.sentence_annotation_offset[annotation.get('sentence_id')] = tmp;
        });
        this.has_annotation = true;
    },
    render: function() {
        g_articles[this.model.id] = this.model;
        g_obj = this.model.toJSON();
        if (g_obj.status_code == 302) {
            window.location.href = g_obj.data.url;
            return;
        }
        if (g_obj.status_code == 404) {
            window.location.href = '/404'
        }
        if (g_obj.data.is_finished) {
            g_status.stage = 2;
        }
        this.$el.html($('#article-content-tmpl').tmpl(g_obj.data));
        if ($.inArray(g_obj.data.quiz_type, g_subfield_article_quiz_types) != -1) {
            this.$el.addClass('subfield');
        }
        new ArticleAudioView();
        this.render_document_title();
        this.render_article_header();
        this.render_article_page();
        this.render_word_span_and_paragraph();
        this.render_article_end();
        disable_word_searching();
        enable_word_searching($('.head-title'));
        return this;
    },
    render_document_title: function() {
        var title_cn = g_obj.data.title_cn;
        var title_en = g_obj.data.title_en;
        if (title_cn) var title = title_cn + ' | ' + title_en;
        else var title = title_en;
        document.title = title;
    },
    render_article_page: function() {
        $('.cabinet').css('height', $(window).height() - $('.reader-nav').height() - 24);
        $('#article-box').css('height', '100%');
        var width = this.$el.width();
        var height = $('#article-box').height() - 160;
        this.page = 1;
        var notes = g_obj.data.notes;
        this.pages = parse_xml(this.$('.article-paragraphs'), g_obj.data.content, width, height, notes);
        this.$('.paged').html($('#pages-tmpl').tmpl({
            cur: this.page,
            pages: this.pages
        }));
        sideBarFixPosition();
        this.cabinet_height = $('.cabinet').height();
        this.adjust_height();
        this.set_timing();
    },
    set_timing: function() {
        var that = this;
        if (!g_obj.data.is_finished && g_obj.data.last_read_sentence) {
            var sentence_id = g_obj.data.last_read_sentence;
            var last_read_time = g_obj.data.last_read_time;
            var page = $('.sentence#' + sentence_id).parents('.page').index();
            page = page == -1 ? 0 : page;
            var now = new Date();
            g_time_begin = new Date(now.getTime() - last_read_time * 1000);
            _.each(_.range(page),
            function(p) {
                var page = p + 1;
                if (page == 1) {
                    that.page_times[page] = g_time_begin;
                } else {
                    that.page_times[page] = new Date(that.page_times[p].getTime() + (($($('.page')[p]).text().split(' ').length / 100) * 10 | 0) * 1000);
                }
            });
            this.page_times[page + 1] = now;
            this.scroll_to_page(page + 1);
        } else {
            g_time_begin = new Date();
            this.page_times[this.page] = g_time_begin;
            this.min_used_seconds = $('.page.active').text().split(' ').length / 11 | 0;
        }
    },
    render_word_span_and_paragraph: function() {
        insert_word_span();
        add_p_num();
    },
    render_article_end: function() {
        g_obj.data.is_quiz_uniq_types = false;
        if (_.contains(g_quiz_uniq_types, g_obj.data.quiz_type)) {
            g_obj.data.is_quiz_uniq_types = true;
        }
        this.$('#article-end').html($(this.article_end_tmpl).tmpl(g_obj.data));
        if (g_obj.data.is_liked) {
            $('.like #like').hide();
            $('.like #liked').show();
        } else {
            $('.like #like').show();
            $('.like #liked').hide();
        }
        if (this.pages == 1 || this.$('.page.active').attr('page') == this.pages) {
            this.$('#article-end').removeClass('hide');
        }
    },
    show_notes_flags: function() {
        this.$('.para-notes').show();
    },
    add_highlight: function() {
        var words_variations = this.highlight_view.words_variations;
        if ($('#toggle-underline').hasClass('active')) {
            highlight_word(words_variations, g_words_unlearned, 'unlearned');
        }
        highlight_word(words_variations, g_words_learning_all, 'learning-all');
    },
    hoverOn: function(e) {
        $(e.currentTarget).find('.muted').show();
    },
    hoverOff: function(e) {
        $(e.currentTarget).find('.muted').hide();
    },
    query_word: function(e) {
        this.ele = e;
        var $target = $(e.currentTarget);
        var word = $target.text();
        var sentence_id = $target.parents('.sentence').attr('id');
        var offset = $target.attr('offset');
        if (this.sentence_annotation_offset[sentence_id]) {
            if (offset in this.sentence_annotation_offset[sentence_id]) {
                word = this.sentence_annotation_offset[sentence_id][offset];
                var offsets = this.sentence_annotation[sentence_id][word];
            }
        }
        this.$('span.sentence span.active').removeClass('active');
        if (typeof offsets != "undefined") {
            _.each(offsets,
            function(offset) {
                $target.parent().find('span[offset=' + offset + ']').addClass('active');
            });
        } else {
            if (word.length - word.lastIndexOf("'s") == 2) word = word.slice(0, word.length - 2);
            if (word.length - word.lastIndexOf(".") == 1 && word.split('.').length < 3) word = word.slice(0, word.length - 1);
            if (word.length - word.lastIndexOf("'") == 1) word = word.slice(0, word.length - 1);
            $target.addClass('active');
        }
        if (this.queryView) {
            this.queryView.remove();
        }
        this.get_applet(word);
        return false;
    },
    get_applet: function(word) {
        var that = this;
        if (this.collins_applet) {
            this.get_word(word);
        } else {
            this.collins_applet = new AppletModel({
                code_name: 'collins'
            });
            this.collins_applet.fetch({
                success: function() {
                    if (!that.collins_applet.get('state')) {
                        that.collins_applet.set('state', 0);
                    }
                    that.get_word(word);
                },
                error: function() {
                    that.collins_applet.set('state', 0);
                    that.get_word(word);
                }
            });
        }
    },
    get_word: function(word) {
        var that = this;
        var words_variations = this.highlight_view.words_variations;
        var state = this.collins_applet.get('state');
        if (word in this.cache_words) {
            var word_id = this.cache_words[word].get('id');
            this.word_model = this.cache_words[word];
            if ((state == 1 || state == 2) && this.word_model.get('result') == 0) {
                this.get_collins_def(word, word_id);
            } else {
                delete this.collins_def;
                this.get_examples(word, word_id);
            }
        } else {
            var w = new Word({
                word: word
            });
            w.fetch({
                url: w.urlRoot + '?word=' + w.get('word'),
                success: function() {
                    that.cache_words[w.get('word')] = w;
                    that.word_model = w;
                    var content = w.get('content');
                    if (! (content in words_variations)) {
                        words_variations[content] = [content];
                    }
                    push_unique(words_variations[content], w.get('word'));
                    if ((state == 1 || state == 2) && w.get('result') == 0) {
                        that.get_collins_def(word, w.get('id'));
                    } else {
                        delete that.collins_def;
                        that.get_examples(word, w.get('id'));
                    }
                }
            });
        }
    },
    get_collins_def: function(word, word_id) {
        var that = this;
        if (word in this.cache_collins_def) {
            this.collins_def = this.cache_collins_def[word];
            this.get_examples(word, word_id);
        } else {
            var collins = new CollinsDef({
                word_id: word_id
            });
            collins.fetch({
                success: function() {
                    that.cache_collins_def[word] = collins;
                    that.collins_def = collins;
                    that.get_examples(word, word_id);
                },
                error: function() {
                    that.get_examples(word, word_id);
                }
            });
        }
    },
    get_examples: function(word, word_id) {
        var that = this;
        if (word in this.cache_examples) {
            this.examples = this.cache_examples[word];
            this.queryView = new QueryView({
                model: this.word_model,
                examples: this.examples,
                target: $(this.ele.currentTarget),
                collins_applet: this.collins_applet,
                collins_def: this.collins_def
            });
        } else {
            var examples = new Examples({
                word_id: word_id
            });
            examples.fetch({
                success: function() {
                    that.cache_examples[word] = examples;
                    that.examples = examples;
                    that.queryView = new QueryView({
                        model: that.word_model,
                        examples: that.examples,
                        target: $(that.ele.currentTarget),
                        collins_applet: that.collins_applet,
                        collins_def: that.collins_def
                    });
                }
            });
        }
    },
    show_notes: function(e) {
        var flag = $(e.currentTarget);
        var flag_screen_y = e.screenY;
        if ($('#article-notes-container').html().trim() && (this.para_id != flag.attr('data'))) {
            $('#article-notes-container').html(' ');
        }
        this.para_id = flag.attr('data');
        if (this.notes_view) {
            this.notes_view.unbind();
            this.notes_view.undelegateEvents();
        }
        if (this.notes_view && this.notes_view.para_id == this.para_id && this.notes_view.open) {
            $('#article-notes-container').html(' ');
            $('.cabinet').css('height', this.cabinet_height);
            this.notes_view.open = false;
        } else {
            this.notes_view = new NotesView({
                flag: flag,
                flag_screen_y: flag_screen_y
            });
        }
    },
    load_points: function() {
        new QuizzesStartView({
            'type': LANGUAGE_POINTS_VIEW_TYPE,
            'readonly': true
        });
    },
    finish_reading: function(e) {
        if (g_obj.data.intensity == 2 && !g_status.answered) {
            new QuizzesStartView({
                'type': QUIZZES_VIEW_TYPE,
                'readonly': false
            });
            return;
        }
        this.finished();
    },
    finished: function(e, quiet) {
        window.scrollTo(0, 0);
        this.check_time();
    },
    check_time: function() {
        g_time_end = new Date();
        var ms = g_time_end - g_time_begin;
        this.used = ms / 1000 | 0;
        var minimum = g_obj.data.min_used_seconds;
        if (this.used < minimum) {
            $('#unfinish-alert .minimum_minutes').text(minimum / 60 | 0);
            $('#unfinish-alert .minimum_seconds').text(minimum % 60 | 0);
            var top = $('#finish-reading').offset().top - 40 + 'px';
            $('#unfinish-alert').css('top', top).show().delay(1200).fadeOut('slow');
        } else {
            this.submit_time();
        }
    },
    submit_time: function() {
        var that = this;
        var api = get_url("finish_api", {
            "article_id": app.article_id
        });
        $.ajax({
            url: api,
            data: {
                used_time: this.used,
                operation: "finish"
            },
            type: "PUT",
            success: function(res) {
                if (res.status_code == 0) {
                    if (app.book_articles) {
                        var finished_article = _.find(app.book_articles.models,
                        function(book_article) {
                            return book_article.id == app.article_id
                        });
                        finished_article.set('is_finished', true);
                    }
                    g_obj.data.is_finished = true;
                    $('#finish-reading').hide();
                    if (g_words_new_detail.length) {
                        new WordsAddView();
                    }
                    new FinalView({
                        'time': that.used
                    })
                }
            }
        });
    },
    like_article: function(e) {
        var $target = $(e.currentTarget);
        $.ajax({
            url: get_url('like_article', {
                "article_id": app.article_id
            }),
            type: 'PUT',
            data: {
                operation: $target.find('span:visible').attr('id') === 'like' ? 'like': 'dislike'
            },
            success: function(res) {
                if (res.status_code == 0) if (res.data.liked) {
                    $('#like', $target).hide();
                    $('#liked', $target).show();
                } else {
                    $('#like', $target).show();
                    $('#liked', $target).hide();
                }
            }
        });
        return false;
    },
    view_answer: function() {
        new QuizzesStartView({
            'type': QUIZZES_VIEW_TYPE,
            'readonly': true
        })
    },
    remove: function() {
        this.undelegateEvents();
        this.toolbarView && this.toolbarView.remove();
    },
    adjust_height: function() {
        $('body').animate({
            scrollTop: 0
        },
        0);
        var height = this.$('.page.active').height();
        $('#article-box').css('min-height', height * 1.5);
        $('.cabinet').css('height', 'auto');
        if (parseInt($('.article-content img').attr('height')) > $(window).height()) {
            return;
        } else if ($('.cabinet').height() < this.cabinet_height) {
            $('.cabinet').css('height', this.cabinet_height + this.cabinet_height / 4);
            $('#article-box').css('height', '100%');
        }
        this.cabinet_height = $('.cabinet').height();
    },
    scroll_to_page: function(page) {
        this.page = page;
        this.$('.paged .text .cur').text(this.page);
        this.$('.page.active').removeClass('active');
        this.$('.page[page=' + this.page + ']').addClass('active');
        this.min_used_seconds = ($('.page.active').text().split(' ').length / 100) * 10 | 0;
        this.adjust_height();
        this.nav_bar_status(page);
    },
    scroll_page: function(e) {
        $('#article-notes-container').html(' ');
        var $target = $(e.currentTarget);
        var page = this.page;
        if ($target.hasClass('left')) {
            page = this.page - 1;
        } else {
            if (app.PREVIEW) {
                return this.scroll_page_hide();
            }
            var now = new Date();
            var ms = now - this.page_times[this.page];
            var s = ms / 1000 | 0;
            if (s < this.min_used_seconds && this.page != this.pages && !g_obj.data.is_finished) {
                var min = this.min_used_seconds / 60 | 0;
                var seconds = this.min_used_seconds % 60;
                this.$('.paged .popup').html($('#popup-time-tmpl').tmpl({
                    minutes: min,
                    seconds: seconds
                })).show().delay(2000).fadeOut('slow');
                return;
            } else {
                page = this.page + 1;
                if (!this.page_times[page]) this.page_times[page] = new Date();
            }
        }
        page = page > 1 ? page: 1;
        page = page < this.pages ? page: this.pages;
        if (page == this.pages) {
            this.$('#article-end').show();
        } else {
            this.$('#article-end').hide();
        }
        if (page != this.page) {
            this.page = page;
            this.$('.paged .text .cur').text(this.page);
            this.$('.page.active').removeClass('active');
            this.$('.page[page=' + this.page + ']').addClass('active');
            this.min_used_seconds = ($('.page.active').text().split(' ').length / 100) * 10 | 0;
            this.adjust_height();
            var sentence_id = $('.page.active .sentence').first().attr('id');
            var data = {
                operation: 'record',
                sentence_id: sentence_id
            };
            if ($target.hasClass('right')) data.used_time = (this.page_times[this.page] - g_time_begin) / 1000 | 0;
            $.ajax({
                url: '/api/v1/read/article/user/' + app.article_id + '/',
                type: 'PUT',
                data: data
            });
        }
        this.nav_bar_status(page);
        window.scrollTo(0, 0);
    },
    scroll_page_hide: function() {
        var page = this.page + 1;
        page = page < this.pages ? page: this.pages;
        this.page = page;
        this.$('.paged .text .cur').text(this.page);
        this.$('.page.active').removeClass('active');
        this.$('.page[page=' + this.page + ']').addClass('active');
        this.adjust_height();
    },
    nav_bar_status: function(page) {
        if (page > 1 && page < this.pages) {
            this.$('.left').removeClass('disable');
            this.$('.right').removeClass('disable');
        } else if (page == 1 && this.pages == 1) {
            this.$('.left').addClass('disable');
            this.$('.right').addClass('disable');
        } else if (page == 1) {
            this.$('.left').addClass('disable');
            this.$('.right').removeClass('disable');
        } else if (page == this.pages) {
            this.$('.left').removeClass('disable');
            this.$('.right').addClass('disable');
        }
    },
    weibo_share: function() {
        $('.weibo-status.sending').show();
        var share_tag = '';
        var share_title = '';
        if (g_obj.data.intensity == 3) {
            share_tag = $('.weibo-share .tag-news').text();
        } else {
            share_tag = $('.weibo-share .tag-reader').text();
        }
        if (g_obj.data.title_cn) {
            share_title = g_obj.data.title_cn;
        } else {
            share_title = g_obj.data.title_en;
        }
        var send_data = {
            'text': share_title + ' ' + share_tag,
            'url': window.location.origin + '/read/article/reviews/' + g_obj.data.id + '/?from=share'
        };
        $.ajax({
            url: '/api/v1/common/share/',
            type: 'POST',
            data: send_data,
            success: function(res) {
                $('.weibo-status').hide();
                if (res.status_code == 0) {
                    $('.weibo-status.success').show();
                } else if (res.status_code == 401 || res.status_code == 400) {
                    window.location.href = '/social_auth/login/weibo/?next=' + window.location.pathname + window.location.hash.replace('#', '');
                } else {
                    $('.weibo-status').hide();
                    $('.weibo-status.failed').show();
                }
                setTimeout(function() {
                    $('.weibo-status').hide();
                },
                1000);
            },
        });
    },
    weixin_qrcode: function(e) {
        var self = e.currentTarget;
        var that = this;
        var size = 110;
        var qrcode_config = {
            width: size,
            height: size,
            correctLevel: 0,
            text: window.location.origin + '/read/article/reviews/' + g_obj.data.id + '/'
        };
        if (ie == 8) {
            var share_url = 'http://' + window.location.host + '/read/article/reviews/' + g_obj.data.id + '/';
            qrcode_config['text'] = share_url;
            _.extend(qrcode_config, {
                render: 'table'
            });
        }
        if (!that.$('#weixin-qrocde').html()) {
            that.$('#weixin-qrocde').qrcode(qrcode_config);
        }
        var top = $(self).position().top - 170;
        var left = $(self).position().left - 50;
        that.$('.weixin-qrcode-box').css({
            'position': 'absolute',
            'top': top,
            'left': left
        });
        that.$('.weixin-qrcode-box .body table').attr('style', '');
        that.$('.weixin-qrcode-box .body table').css({
            'width': size + 20,
            'height': size + 20
        });
        var target = that.$('.weixin-qrcode-box');
        if (target.hasClass('hide')) {
            target.removeClass('hide');
        } else {
            target.addClass('hide');
        }
    },
});
var WordsAddView = Backbone.View.extend({
    el: '#show-words-add',
    events: {
        'click .confirm-btn': 'remove_words_box'
    },
    initialize: function() {
        var html = $('#show-words-add-tmpl').tmpl({
            words: g_words_new_detail
        });
        this.$el.html(html);
    },
    remove_words_box: function() {
        $('.show-words-add').remove();
    },
});
var TestInfo = Backbone.Model.extend({
    url: function() {
        return '/api/v1/read/article/' + app.article_id + '/test/';
    },
    parse: function(res) {
        return res.data;
    }
});
ArticleContentView.extend = function(child) {
    var view = Backbone.View.extend.apply(this, Array.prototype.slice.call(arguments));
    view.prototype.events = _.extend({},
    this.prototype.events, child.events);
    return view;
};
var ExtensiveView = ArticleContentView.extend({
    initialize: function() {
        ArticleContentView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        ArticleContentView.prototype.render.apply(this, Array.prototype.slice.call(arguments));
        this.highlight_view = new HighlightView({
            context: this,
            silent: false
        });
    },
    render_article_header: function() {
        this.$el.show();
        $('#article-box .article-header').html($('#article-header-tmpl').tmpl({
            'article': g_obj.data
        }));
        var original = $('#article-box span.original a').attr('href');
        if (original.indexOf('www.shanbay.com/read/article/origin') != -1) {
            $('#article-box span.original').remove();
        } else {
            original = original.replace('http://', '');
            original = original.replace('https://', '');
            original = original.slice(0, original.indexOf('/'));
            $('#article-box span.original a').text(original);
        }
    }
});
var IntensiveView = ArticleContentView.extend({
    initialize: function() {
        ArticleContentView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },
    render: function() {
        ArticleContentView.prototype.render.apply(this, Array.prototype.slice.call(arguments));
        $('.cabinet').css('height', 'auto');
        if (g_obj.data.is_finished) {
            this.highlight_view = new HighlightView({
                context: this,
                silent: false
            });
            this.show_notes_flags();
        } else {
            this.highlight_view = new HighlightView({
                context: this,
                silent: true
            });
        }
    },
    render_article_header: function() {
        this.$el.show();
        var test_info = new TestInfo();
        test_info.fetch({
            success: function(model, res) {
                if (res.status_code == 0) {
                    app.test_info = model.toJSON();
                } else {
                    app.test_info = {
                        'time': 0,
                        'test_explanation': ''
                    };
                }
                if (g_obj.data.is_finished == false) {
                    app.timer_view = new TimerView(app.test_info.time);
                }
                var html = $('#article-intensive-header-tmpl').tmpl({
                    'article': g_obj.data,
                    'test_info': app.test_info
                });
                $('#article-box .article-header').html(html);
                enable_word_searching($('.head-title'));
                enable_word_searching($('.test-explanation'));
            }
        });
    },
    render_article_page: function() {
        if ($.inArray(g_obj.data.quiz_type, g_subfield_article_quiz_types) != -1) {
            $('.cabinet').removeClass('span8').addClass('span12');
            $('.reader-nav').parent().removeClass('span8').addClass('span12');
            $('#article-notes-container').addClass('subfield');
        }
        $('.cabinet').css('height', $(window).height() - $('.reader-nav').height() - 24);
        $('#article-box').css('height', '100%');
        var width = this.$el.width();
        var height = 10000;
        var notes = g_obj.data.notes;
        this.page = 1;
        this.pages = parse_xml(this.$('.article-paragraphs'), g_obj.data.content, width, height, notes);
        if (g_obj.data.quiz_type === g_quiz_type_paragraph_sorting & !g_obj.data.is_finished) {
            $('.paragraph').hide();
        }
        this.$('.para-notes').hide();
        this.cabinet_height = $('.cabinet').height();
        this.adjust_height();
        if (g_obj.data.is_finished) {
            new QuizzesStartView({
                'type': LANGUAGE_POINTS_VIEW_TYPE,
                'readonly': true
            });
        } else {
            this.finish_reading();
        }
    }
});
var Word = Backbone.Model.extend({
    urlRoot: '/api/v1/bdc/search/',
    parse: function(response) {
        data = response.data;
        if (response.status_code == 0) {
            data.result = 0;
        } else {
            data.result = 1;
            data.note = response.msg;
        }
        return data;
    }
});
var Examples = Backbone.Model.extend({
    url: function() {
        return '/api/v1/bdc/example/sys/?vocabulary_id=' + this.get('word_id');
    },
    parse: function(res) {
        return res.data;
    }
});
var CollinsDef = Backbone.Model.extend({
    url: function() {
        return '/api/v1/bdc/vocabulary/definitions/' + this.get('word_id');
    },
    parse: function(res) {
        return res.data;
    }
});
var QueryView = Backbone.View.extend({
    events: {
        'mouseleave': function() {
            this.$el.fadeOut(500);
        },
        'mouseenter': function() {
            this.$el.fadeIn(10);
        },
        'click .speaker': 'speaker',
        'mouseover .speaker': 'show_speaker_playing_icon',
        'mouseout .speaker': 'show_speaker_icon',
        'click #add': 'add_to_plan',
        'click #easy': 'too_easy',
        'click #forget': 'forget',
        'click #retry': 'retry',
        'click': function() {
            $("body").click();
            return false;
        },
        'click .pagination ul li.page-item': 'change_page',
        'click #collins-def ol li i': 'definition_to_top',
        'click #show-more-def': 'show_more_def',
        'click #examples .show-examples': 'render_examples',
        'click #guide-collins': 'apply_collins',
        'dblclick .word': 'query_word'
    },
    initialize: function() {
        _.bindAll(this, 'render', 'definition', 'get_new_examples', 'speaker', 'remove', 'add_to_plan', 'too_easy', 'forget', 'retry', 'query_word');
        this.target = this.options['target'];
        this.collins_applet = this.options['collins_applet'];
        this.examples = this.options['examples'];
        this.collins_def = this.options['collins_def'];
        this.collins_def = this.collins_def ? this.collins_def.toJSON() : undefined;
        this.is_trial = (function(applet) {
            return applet.state == 1
        })(this.collins_applet.toJSON());
        this.is_bought = (function(applet) {
            return applet.state == 2
        })(this.collins_applet.toJSON());
        this.collins_used = this.is_trial || this.is_bought;
        this.is_unlearned = $.inArray(this.model.get('content'), g_words_unlearned);
        this.definition_unavailable = (g_obj.data.intensity == 2 && g_status.stage == 1);
        this.render();
    },
    definition: function() {
        return this.model.toJSON();
    },
    render: function() {
        var definition = this.definition();
        var data = {
            word: definition,
            is_unlearned: this.is_unlearned,
            definition_unavailable: this.definition_unavailable,
            collins_used: this.is_trial || this.is_bought,
            collins_trial: this.is_trial,
            examples: this.examples.toJSON(),
            collins_def: this.collins_def
        }
        $('.page #query-word').remove();
        this.$el = $('#query-word-tmpl').tmpl(data);
        this.$el.appendTo(this.target.parents('.page'));
        this.padding = parseInt(this.$el.css('padding-left'));
        this.triangle_width = parseInt(this.$el.find('.triangle').css('border-bottom-width'));
        this.triangle_outter_width = parseInt(this.$el.find('.triangle-outter').css('border-bottom-width'));
        this.show_popup();
        this.$el.stop(true, true).show();
        return this;
    },
    apply_collins: function() {
        this.remove();
        var that = this;
        if (this.collins_applet.get('state') == 3) {
            $.ajax({
                url: '/api/v1/market/userapplet/id/' + this.collins_applet.get('id') + '/',
                type: 'PUT',
                data: {
                    disable: 0
                },
                success: function(res) {
                    app.article_content_view.collins_applet = null;
                    app.article_content_view.cache_words = {};
                    app.article_content_view.cache_examples = {};
                    app.article_content_view.cache_collins_def = {};
                    app.article_content_view.get_applet(that.model.get('content'));
                }
            });
        } else {
            if (buy_collins_modal === undefined) {
                buy_collins_modal = new BuyCollinsModalView({
                    'applet': this.collins_applet
                });
            } else {
                buy_collins_modal.show();
            }
        }
    },
    render_examples: function() {
        var html = $('#word-examples-tmpl').tmpl({
            examples: this.examples.toJSON()
        });
        this.$('#examples').html(html);
        this.adjust_article_top();
        return false;
    },
    render_collins_def: function(page_index) {
        var definition = this.definition();
        var en_definitions = this.collins_def.definitions;
        var current;
        en_definitions = _.sortBy(en_definitions,
        function(def) {
            return def.sense_id;
        });
        for (var i = 0; i < en_definitions.length; i++) {
            if (en_definitions[i].sense_id == definition.sense_id) {
                current = en_definitions[i];
                en_definitions.splice(i, 1);
                break;
            }
        }
        en_definitions.unshift(current);
        var data = {
            en_definitions: en_definitions,
            page_index: page_index
        }
        var html = $('#collins-def-tmpl').tmpl(data);
        this.$('#collins-def').html(html);
        this.adjust_article_top();
    },
    show_more_def: function() {
        this.render_collins_def(1);
        return false;
    },
    change_page: function(e) {
        var page = $(e.currentTarget).find('a').text();
        this.render_collins_def(page);
        return false;
    },
    definition_to_top: function(e) {
        if (this.model.get('learning_id')) {
            var sense_id = parseInt($(e.currentTarget).attr('data'));
            var current_def = _.find(this.collins_def.definitions,
            function(def) {
                return def.sense_id == sense_id;
            });
            var page_index = 1;
            var that = this;
            $.ajax({
                url: '/api/v1/bdc/vocabulary/definitions/' + this.model.get('id'),
                type: 'PUT',
                data: {
                    sense_id: sense_id
                },
                success: function(res) {
                    var def = {
                        pos: current_def.pos1,
                        defn: current_def.endf
                    }
                    that.model.set('en_definition', def);
                    that.model.set('sense_id', sense_id);
                    that.render_collins_def(page_index);
                    that.get_new_examples();
                }
            });
        } else {
            this.$('.to-top-fail').fadeIn().delay(1500).fadeOut();
        }
        return false;
    },
    get_new_examples: function() {
        var new_examples = new Examples({
            word_id: this.model.get('id')
        });
        var that = this;
        new_examples.fetch({
            success: function() {
                that.examples = new_examples;
                if (that.$('.show-examples').length == 0) {
                    that.render_examples();
                }
            }
        });
    },
    adjust_article_top: function() {
        var $article = $('.cabinet');
        var total_height = parseInt(this.$el.css('top')) + this.$el.height() + this.padding * 2;
        if (total_height > $article.height()) {
            $article.css('height', total_height + 20);
        }
    },
    query_word: function() {
        var word = $.trim(getSelText());
        this.remove();
        app.article_content_view.get_word(word);
        return false;
    },
    show_popup: function() {
        this.$el.css(this.get_popup_position()).show();
        this.adjust_article_top();
    },
    get_popup_position: function() {
        var pos = this.target.position();
        var delta = 4;
        pos.top += this.target.height();
        pos.top -= (this.$el.height() + this.padding * 2 + 20);
        if (pos.top < 0) {
            pos.top = 0;
        }
        var parent = $('#article-box');
        if (pos.left < parent.width() / 2) {
            pos.left += this.target.width() + this.triangle_width + delta;
            this.$('.triangle.triangle-left').css('top', this.get_triangle_top() - pos.top - 11).show();
            this.$('.triangle-outter.triangle-left').css('top', this.get_triangle_outter_top() - pos.top - 10).show();
        } else {
            pos.left -= this.$el.width() + this.triangle_width + this.padding * 2 + delta;
            this.$('.triangle.triangle-right').css('top', this.get_triangle_top() - pos.top - 11).show();
            this.$('.triangle-outter.triangle-right').css('top', this.get_triangle_outter_top() - pos.top - 10).show();
        }
        return pos;
    },
    get_triangle_top: function() {
        var pos = this.target.position();
        if (pos.top < this.triangle_width / 2) {
            pos.top += this.target.height() + 11;
            this.$('.triangle').addClass('triangle-rotate');
        } else {
            pos.top = pos.top + this.target.height() / 2 - this.triangle_width;
        }
        return pos.top;
    },
    get_triangle_outter_top: function() {
        var pos = this.target.position();
        if (pos.top < this.triangle_outter_width / 2) {
            pos.top += this.target.height() + 10;
            this.$('.triangle-outter').addClass('triangle-rotate');
        } else {
            pos.top = pos.top + this.target.height() / 2 - this.triangle_outter_width;
        }
        return pos.top;
    },
    show_speaker_playing_icon: function() {
        this.$('.speaker i').removeClass('sf-icon-speaker').addClass('sf-icon-speaker-playing');
    },
    show_speaker_icon: function() {
        this.$('.speaker i').removeClass('sf-icon-speaker-playing').addClass('sf-icon-speaker');
    },
    speaker: function(e) {
        e.preventDefault();
        speak(this.definition());
        return false;
    },
    add_to_plan: function(e) {
        var definition = this.definition();
        var word = definition.content;
        var that = this;
        this.$('.actions>span').hide();
        var $loading = this.$('.actions>.loading').show();
        $.post('/api/v1/bdc/learning/', {
            id: definition.object_id
        },
        function(res) {
            $loading.hide();
            data = res.data;
            if (data.id == 0) {
                that.$(".actions>#failed").show().find("#retry").data("action", "#add");
            } else {
                that.$(".actions>.success").show();
                var from = document.querySelector("#word");
                var to = document.querySelector("#shanbay-bdc");
                var parabola = funParabola(from, to, {
                    speed: 100,
                    curvature: 0.012,
                    complete: function() {
                        from.style.visibility = "hidden";
                    }
                });
                from.style.visibility = "visible";
                parabola.position().move();
                if (push_unique(g_words_learning_all, word) == -1) {
                    learningCollection.add({
                        word: word,
                        learning_id: data.id
                    });
                    var models = unlearnedCollection.models;
                    unlearnedCollection.remove(_.find(models,
                    function(model) {
                        return model.get('word') == word
                    }));
                }
                that.model.set('learning_id', data.id);
                push_unique_word(g_words_new, g_words_new_detail, definition);
            }
        });
        return false;
    },
    too_easy: function(e) {
        var definition = this.definition();
        var word = definition.content;
        var that = this;
        this.$('.actions>span').hide();
        var $loading = this.$('.actions>.loading').show();
        $.post('/api/v1/bdc/learning/', {
            id: definition.object_id,
            retention: 100,
            review_status: -1
        },
        function(res) {
            $loading.hide();
            that.target.removeClass('unlearned');
            if (res.status_code != 0) {
                that.$(".actions>#failed").show().find("#retry").data("action", "#easy");
            } else {
                that.$(".actions>.passed").show();
                var models = unlearnedCollection.models;
                unlearnedCollection.remove(_.find(models,
                function(model) {
                    return model.get('word') == word
                }));
                that.model.set('learning_id', res.data.id);
            }
        });
        return false;
    },
    forget: function(data, word) {
        var definition = this.definition();
        var word = definition.content;
        var that = this;
        this.$('.actions>span').hide();
        var $loading = this.$('.actions>.loading').show();
        var url = '/api/v1/bdc/learning/' + definition.learning_id;
        $.ajax({
            url: url,
            type: 'PUT',
            data: {
                retention: 1
            },
            success: function(res) {
                $loading.hide();
                if (res.status_code != 0) {
                    that.$('.actions>#failed').show().find('#retry').data('action', '#forget');
                } else {
                    that.$('.actions>.success').show();
                    if (push_unique(g_words_learning_all, word) == -1) {
                        learningCollection.add({
                            word: word,
                            learning_id: that.definition().learning_id
                        });
                        var models = unlearnedCollection.models;
                        unlearnedCollection.remove(_.find(models,
                        function(model) {
                            return model.get('word') == word
                        }));
                    }
                    push_unique_word(g_words_new, g_words_new_detail, definition);
                }
            }
        });
        return false;
    },
    retry: function(e) {
        e.preventDefault();
        var action = $(e.target).data('action');
        this.$(action).click();
    },
    remove: function() {
        this.undelegateEvents();
        this.$el.hide();
    }
}) var UserAccountModel = Backbone.Model.extend({
    url: '/api/v1/coins/useraccount/',
    parse: function(res) {
        return res.data;
    }
});
var AppletPolicyModel = Backbone.Model.extend({
    url: function() {
        return '/api/v1/market/applet/price/?code=' + this.get('code_name');
    },
    parse: function(res) {
        return res.data;
    }
});
var BuyCollinsModalView = Backbone.View.extend({
    el: '#buy-collins-modal',
    events: {
        'click .collins-action': 'buy_or_try_collins',
        'scroll': 'toggle_to_top_btn',
        'click #scroll-to-top': 'scroll_to_top'
    },
    initialize: function() {
        this.collins_state = this.options['applet'].get('state');
        this.user_account = new UserAccountModel();
        this.applet_policy = new AppletPolicyModel({
            code_name: 'collins'
        });
        var that = this;
        this.user_account.fetch({
            success: function() {
                that.user_account_ready = true;
                that.check_data_ready();
            }
        });
        this.applet_policy.fetch({
            success: function() {
                that.applet_policy_ready = true;
                that.check_data_ready();
            }
        });
    },
    check_data_ready: function() {
        if (this.user_account_ready && this.applet_policy_ready) {
            this.render();
        }
    },
    render: function() {
        var data = {
            state: this.collins_state,
            collins_policy: _.filter(this.applet_policy.toJSON(),
            function(policy) {
                return policy.id !== undefined
            }),
            balance: this.user_account.get('balance')
        };
        var html = $('#buy-collins-modal-tmpl').tmpl(data);
        this.$el.html(html);
        this.show();
    },
    show: function() {
        this.$el.modal('show');
    },
    buy_or_try_collins: function(e) {
        $target = $(e.currentTarget);
        var price_id = $target.attr('data');
        var that = this;
        if (price_id) {
            var url = "/api/v1/market/collins/buy/"$.post(url, {
                price_id: price_id
            },
            function() {
                var time = 3;
                setInterval(function() {
                    if (time == 0) {
                        document.location.reload();
                    } else {
                        that.$('.label-msg').text($target.text() + '成功,页面将在' + time + '秒后刷新');
                        time -= 1;
                    }
                },
                1000);
            });
        }
    },
    toggle_to_top_btn: function() {
        if (this.$el.scrollTop() == 0) {
            this.$('#scroll-to-top').hide();
        } else {
            this.$('#scroll-to-top').show();
        }
    },
    scroll_to_top: function() {
        this.$el.animate({
            scrollTop: 0
        },
        200);
    }
});
var FinalView = Backbone.View.extend({
    el: '#finish-container',
    events: {
        'click .review-add-hint': 'show_add_panel',
        'click .add-review': 'add_review',
        'click .add-review-cancel': 'add_review_cancel',
        'hover .weixin.finish': 'weixin_qrcode_show',
        'click .weibo.finish': 'weibo_share_finish',
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'remove');
        this.time = options.time;
        this.min = this.time / 60 | 0;
        this.second = this.time % 60;
        $("#finish-box").remove();
        if (this.options['parent']) {
            this.options['parent'].remove();
        }
        this.$el.on('hidden', this.remove) $('#article-end').show();
        this.render();
    },
    render: function() {
        var data = {
            mins: this.min,
            sec: this.second,
            id: app.article_id,
            article_type: g_obj.data.intensity
        };
        this.$el.html($('#finish-tmpl').tmpl(data));
        $('body').animate({
            scrollTop: this.$el.offset().top - 200
        },
        300);
        $('.article-content .title').hide();
        $('#article-notes-container').removeClass('subfield');
    },
    show_add_panel: function() {
        this.$('.review-add-hint').hide();
        this.$('.review-edit-panel').show();
    },
    add_review: function() {
        var content = this.$('.new-review').val();
        if (!content) {
            this.$('.new-review').addClass('blank-alert');
            var that = this;
            setTimeout(function() {
                that.$('.new-review').removeClass('blank-alert');
            },
            800);
            return;
        }
        var that = this;
        $.ajax({
            url: '/api/v1/read/article_review/' + app.article_id + '/',
            type: 'POST',
            data: {
                content: content
            },
            success: function(res) {
                if (res.status_code == 0) {
                    that.$('.new-review').hide();
                    that.$('.submit').hide();
                    that.$('.review-show').html(content).show();
                }
            }
        });
    },
    add_review_cancel: function() {
        this.$('.review-edit-panel').hide();
        this.$('.review-add-hint').show();
    },
    weixin_qrcode_show: function(e) {
        var self = e.currentTarget;
        var that = this;
        var size = 110;
        var qrcode_config = {
            width: size,
            height: size,
            correctLevel: 0,
            text: window.location.origin + '/read/article/reviews/' + g_obj.data.id + '/'
        };
        if (ie == 8) {
            var share_url = 'http://' + window.location.host + '/read/article/reviews/' + g_obj.data.id + '/';
            qrcode_config['text'] = share_url;
            _.extend(qrcode_config, {
                render: 'table'
            });
        }
        if (!that.$('#weixin-qrocde').html()) {
            that.$('#weixin-qrocde').qrcode(qrcode_config);
        }
        var top = $(self).position().top - 170;
        var left = $(self).position().left - 30;
        that.$('.weixin-qrcode-box').css({
            'position': 'absolute',
            'top': top,
            'left': left
        });
        that.$('.weixin-qrcode-box .body table').attr('style', '');
        that.$('.weixin-qrcode-box .body table').css({
            'width': size + 20,
            'height': size + 20
        });
        var target = that.$('.weixin-qrcode-box');
        if (target.hasClass('hide')) {
            target.removeClass('hide');
        } else {
            target.addClass('hide');
        }
    },
    weibo_share_finish: function() {
        $('.weibo-status.sending').show();
        var share_tag = '';
        var share_title = '';
        if (g_obj.data.intensity == 3) {
            share_tag = $('.weibo-share .tag-news').text();
        } else {
            share_tag = $('.weibo-share .tag-reader').text();
        }
        if (g_obj.data.title_cn) {
            share_title = g_obj.data.title_cn;
        } else {
            share_title = g_obj.data.title_en;
        }
        var send_data = {
            'text': share_title + ' ' + share_tag,
            'url': window.location.origin + '/read/article/reviews/' + g_obj.data.id + '/?from=share'
        };
        $.ajax({
            url: '/api/v1/common/share/',
            type: 'POST',
            data: send_data,
            success: function(res) {
                $('.weibo-status').hide();
                if (res.status_code == 0) {
                    $('.weibo-status.success').show();
                } else if (res.status_code == 401 || res.status_code == 400) {
                    window.location.href = '/social_auth/login/weibo/?next=' + window.location.pathname + window.location.hash.replace('#', '');
                } else {
                    $('.weibo-status').hide();
                    $('.weibo-status.failed').show();
                }
                setTimeout(function() {
                    $('.weibo-status').hide();
                },
                1000);
            },
        });
    },
    remove: function() {
        this.undelegateEvents();
    }
});
var ArticleQuizzes = Backbone.Collection.extend({
    url: function() {
        return get_url('get_quizzes', {
            article_id: app.article_id
        });
    },
    parse: function(res) {
        return res.data;
    }
});
var Quiz = Backbone.Model.extend({});
var Answer = Backbone.Model.extend({
    url: function() {
        return get_url('answer', {
            quiz_id: this.get('quiz_id')
        });
    },
    parse: function(res) {
        return res.data;
    }
});
var AnswerResult = Backbone.Model.extend({
    url: '/api/v1/read/article/answers/',
    parse: function(res) {
        return res.data;
    }
});
var LanguagePoint = Backbone.Model.extend({
    url: '/api/v1/read/article/language_point/',
    parse: function(res) {
        return res.data;
    }
});
var QuizzesStartView = Backbone.View.extend({
    el: '#quizzes-or-language-points',
    initialize: function(options) {
        _.bindAll(this, 'prepare_user_answers');
        this.readonly = options.readonly;
        this.quizzes_type = g_obj.data.quiz_type;
        this.type = options.type;
        if (app.sorted_quizzes) {
            this.render_container();
        } else {
            this.prepare_quizzes();
        }
    },
    render: function() {},
    prepare_quizzes: function() {
        var that = this;
        var article_quizzes = new ArticleQuizzes();
        article_quizzes.fetch({
            success: function(collection, res) {
                if (res.status_code == 0) {
                    that.prepare_user_answers(collection.toJSON());
                }
            }
        });
    },
    prepare_user_answers: function(article_quizzes_data) {
        var that = this;
        var answer_result = new AnswerResult();
        answer_result.fetch({
            data: {
                article_id: app.article_id
            },
            success: function(model, res) {
                _.each(article_quizzes_data,
                function(quiz, index) {
                    var gids = quiz['paragraph_gid'].split(',');
                    quiz['object_id'] = gids[gids.length - 1];
                    var target_answer = _.find(model.get('answers'),
                    function(answer) {
                        return answer[quiz['id']] !== undefined
                    });
                    quiz['user_choice_ids'] = (target_answer && target_answer[quiz['id']].split(',')) || [];
                    quiz['is_correct'] = (target_answer && target_answer.is_correct) || false;
                    that.quiz_type = quiz['quiz_type']
                });
                app.sorted_quizzes = new Backbone.Collection(that.sort_quizzes(article_quizzes_data));
                that.render_container();
            }
        });
    },
    render_container: function() {
        this.$el.show();
        var html = $('#quizzes-or-language-points-tmpl').tmpl({
            'type': this.type,
            'readonly': this.readonly,
            'is_finished': g_obj.data.is_finished,
            'article': g_obj.data
        });
        if ($.inArray(this.quizzes_type, g_subfield_article_quiz_types) != -1) {
            this.$el.addClass('subfield');
        }
        this.$el.html(html);
        if (this.type === LANGUAGE_POINTS_VIEW_TYPE) {
            if (this.quizzes_type === g_quiz_type_paragraph_sorting) {
                new ParagraphSortingLanguagePointsView({
                    'quizzes_type': this.quizzes_type
                });
                return;
            }
            new LanguagePointsView({
                'quizzes_type': this.quizzes_type
            });
            return;
        }
        if (this.type === QUIZZES_VIEW_TYPE) {
            if (this.quizzes_type === g_quiz_type_paragraph_sorting) {
                this.$el.hide();
                new ParagraphSortingQuizzesView({
                    'readonly': this.readonly,
                    'quizzes_type': this.quizzes_type
                });
                return;
            }
            new QuizzesView({
                'readonly': this.readonly,
                'quizzes_type': this.quizzes_type
            });
        }
    },
    sort_quizzes: function(quizzes) {
        _.sortBy(quizzes,
        function(q1, q2) {
            return q1.sequence - q2.sequence
        });
        return quizzes;
    }
});
var TimerView = Backbone.View.extend({
    el: '#article-timer',
    events: {},
    initialize: function(minutes_cap) {
        var html = $('#article-timer-tmpl').tmpl();
        this.$el.html(html);
        minutes_cap = minutes_cap > 0 ? minutes_cap: 1000;
        this.seconds_cap = parseInt(minutes_cap) * 60;
        this.seconds = 0;
        this.render();
    },
    render: function() {
        var that = this,
        minutes = 0,
        seconds = 0,
        timer_str = "00:00";
        minutes = parseInt(this.seconds / 60);
        seconds = this.seconds % 60;
        minutes = minutes < 10 ? "0{0}".format(minutes) : "{0}".format(minutes);
        seconds = seconds < 10 ? "0{0}".format(seconds) : "{0}".format(seconds);
        timer_str = "{0}:{1}".format(minutes, seconds) this.$el.find('span').text(timer_str);
        if (this.seconds >= this.seconds_cap) {
            this.$el.find('span').css('color', 'red')
        }
        this.timer = setTimeout(function() {
            that.timing();
        },
        1000)
    },
    timing: function() {
        this.seconds += 1;
        this.render();
    },
    stop: function() {
        clearInterval(this.timer);
        return this.seconds;
    },
    get_time: function() {
        return this.seconds;
    }
});
$('.main.container').click(function(e) {
    $('#query-word').fadeOut();
    $('span.sentence span.active').removeClass('active');
});
$('#points_modal .btn').unbind('click').click(function() {
    $('#points_modal').modal('hide');
    window.scrollTo(0, 0);
    $('#finish-answer').hide();
});
var ie = function() {
    var v = 4,
    div = document.createElement('div'),
    i = div.getElementsByTagName('i');
    do {
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
    } while ( i [ 0 ]);
    return v > 5 ? v: false;
} ();
if (ie && ie < 8) {
    $('#browsers').appendTo($('body'));
    $('#browsers').modal();
    $('#browsers').on('hidden',
    function() {
        window.location.href = '/read/home/'
    })
}
$.ajaxSetup({
    cache: false
});
var app = app || {};
app.span_blocks = [];
function get_scroll_top() {
    var top = window.scrollY;
    if (!top) top = document.documentElement ? document.documentElement.scrollTop: 0;
    return top;
}
$('.cabinet').css('height', $(window).height() - $('.reader-nav').height() - 24);
$('#home').hover(function() {
    $('.side-bar-block').hide();
    $('.hover').removeClass('hover');
});
$(function() {
    var Book = Backbone.Model.extend({
        urlRoot: '/api/v1/read/book/',
        initialize: function(options) {
            this.url = '/api/v1/read/book/' + options['id'] + '/';
        },
        parse: function(res) {
            return res.data
        }
    });
    var BookCollection = Backbone.Collection.extend({
        model: Book,
        url: '',
        parse: function(res) {
            return res.data
        }
    }) var UserBook = Backbone.Model.extend({
        urlRoot: '/api/v1/read/book/user/'
    });
    var BookComments = Backbone.Collection.extend({
        url: '/api/v1/book/comment/read/',
        parse: function(res) {
            return res.data;
        }
    });
    var BookArticles = Backbone.Collection.extend({
        url: '/api/v1/read/book/articles/',
        initialize: function(models, options) {
            this.url += options['book_id'] + '/';
        },
        parse: function(res) {
            return _.map(res.data,
            function(book_article) {
                return book_article.article;
            });
        }
    });
    var SpanBlockView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'show_el', 'hide_el');
            app.span_blocks.push(this);
            this.icon_el = $(this.options.icon_el);
            this.triangle = this.icon_el.find('.triangle');
            this.icon_el.removeClass('hide');
            this.icon_el.hover(this.show_el);
            this.$el.mouseleave(this.hide_el);
            $('#article-box').mouseenter(this.hide_el);
        },
        show_el: function() {
            var that = this;
            this.icon_el.addClass('hover');
            _.each(app.span_blocks,
            function(b) {
                if (b.cid != that.cid) b.hide_el();
            }) this.$el.fadeIn();
            this.triangle.css('left', this.icon_el.position().left + 5).show();
        },
        hide_el: function() {
            this.icon_el.removeClass('hover');
            this.$el.fadeOut();
            this.triangle.hide();
        }
    });
    var BookContentView = SpanBlockView.extend({
        el: '#book-content',
        events: {
            'click .article-entry a': 'render_article'
        },
        initialize: function() {
            SpanBlockView.prototype.initialize.call(this);
            _.bindAll(this, 'render_entrys', 'render_article', 'show_el', 'hide_el');
            app.book_articles = new BookArticles([], {
                book_id: app.book_id
            });
            app.book_articles.bind('all', this.render_entrys) app.book_articles.fetch();
        },
        render_entrys: function() {
            var that = this;
            var articles = app.book_articles.toJSON();
            _.each(articles,
            function(article) {
                article.purchased = that.model.attributes.user_info.is_purchased;
            });
            this.$('.book-info').html(this.$('#book-content-info-tmpl').tmpl(this.model.toJSON()));
            this.$('.book-entrys').html(this.$('#book-entry-tmpl').tmpl(articles));
            var height = $(window).height() - 180;
            this.$('.book-entrys').slimScroll({
                height: height
            });
            this.$('li a#' + app.article_id).addClass('active-link');
        },
        render_article: function(e) {
            var $target = $(e.currentTarget);
            $('a.active-link').removeClass('active-link');
            $target.addClass('active-link');
            var id = $target.attr('id');
            var url = "/read/article/{0}/".format([id]);
            location.href = url;
        }
    });
    var BookBuyView = SpanBlockView.extend({
        el: '#book-buy',
        events: {
            'click #buy': 'buy_book'
        },
        initialize: function() {
            SpanBlockView.prototype.initialize.call(this);
            _.bindAll(this, 'buy_book');
            $('#book-buy').html($('#purchase-popup-tmpl').tmpl(this.model.toJSON()));
        },
        buy_book: function(e) {
            var that = this;
            var $target = $(e.currentTarget);
            var $wrapper = $target.parent() if ($target.hasClass('disabled')) return false;
            $target.addClass('disabled');
            $wrapper.find('#loading').show();
            var userbook = new UserBook({
                book_id: app.book_id
            });
            userbook.save({},
            {
                success: function(model, res) {
                    $wrapper.find('#loading').hide();
                    $target.hide();
                    if (res.status_code == 0) {
                        that.$('a.want-read').addClass('disabled');
                        $wrapper.find('.alert-success').show();
                        that.model.attributes.user_info.is_purchased = true;
                        app.book_content.render_entrys();
                        _.each(g_articles,
                        function(value, key) {
                            if (value.get('status_code') != 0) {
                                delete g_articles[key];
                            }
                        }) that.$('a.want-read').text(that.$('a.want-read #purchased').text());
                        $('#purchase-popup').delay(2000).fadeOut(1000);
                    } else {
                        $wrapper.find('.alert-error').show();
                    }
                }
            });
        },
    });
    var BookInfoView = SpanBlockView.extend({
        el: '#book-info',
        events: {
            'click a.want-read': 'popup_purchase',
            'click .comment .like': 'star_comment',
        },
        initialize: function() {
            SpanBlockView.prototype.initialize.call(this);
            _.bindAll(this, 'render', 'render_comments', 'popup_purchase', 'star_comment', 'show_el', 'hide_el');
            this.render();
            app.book_comments = new BookComments();
            app.book_comments.bind('reset', this.render_comments);
            app.book_comments.fetch({
                url: app.book_comments.url + app.book_id + '/'
            });
        },
        render: function() {
            this.$('.book-info').html($('#book-info-tmpl').tmpl(this.model.toJSON()));
            var height = $(window).height() - 60;
            this.$('.book-info').slimScroll({
                height: height
            });
        },
        render_comments: function() {
            if (app.book_comments.length) {
                this.$('.book-comments').show();
                this.$('.book-comments ul').html($('#book-comment-tmpl').tmpl(app.book_comments.toJSON()));
            }
        },
        popup_purchase: function(e) {
            var $target = $(e.currentTarget);
            if ($target.hasClass('disabled')) {
                return false;
            }
            var pos = $target.position();
            pos.top += 55;
            $('#purchase-popup').css(pos).show();
            $('#purchase-popup #buy').click(this.buy_book);
        },
        star_comment: function(e) {
            var $target = $(e.currentTarget);
            var action = 'like';
            if ($target.hasClass('liked')) action = 'dislike';
            var num = parseInt($target.parent().find('.star-num').text());
            $.ajax({
                url: '/api/v1/book/comment/vote/' + $target.parents('li').attr('id') + '/',
                type: 'PUT',
                data: {
                    action: action
                },
                success: function(res) {
                    if (res.status_code == 0) {
                        if (action == 'like') {
                            num += 1;
                            $target.addClass('liked');
                            $target.parent().find('.star-num').text(num);
                        } else {
                            num -= 1;
                            $target.removeClass('liked');
                            $target.parent().find('.star-num').text(num);
                        }
                    }
                }
            })
        }
    });
    var LevelView = SpanBlockView.extend({
        el: '#article-level',
        events: {
            'click td': 'set_level',
            'click #toggle-underline': 'toggle_line'
        },
        initialize: function() {
            SpanBlockView.prototype.initialize.call(this);
            _.bindAll(this, 'render', 'set_level', 'fill_category', 'toggle_line');
            this.url = get_url('category_api');
            var that = this;
            $.get(this.url,
            function(response) {
                that.category = response.data;
                $('.highlight.new .text').text(that.category.name);
                that.render();
            })
        },
        render: function() {
            var that = this;
            $.get(this.url, {
                all: true
            },
            function(response) {
                g_categories = response.data;
                var category_list = [];
                _.each(g_categories,
                function(value, key) {
                    if (category_list.length < 2) {
                        category_list.push({
                            id: key,
                            name: value
                        });
                    } else {
                        that.fill_category(category_list);
                        category_list = [{
                            id: key,
                            name: value
                        }];
                    }
                });
                that.fill_category(category_list);
            });
        },
        set_level: function(e) {
            var $target = $(e.currentTarget);
            var data = $target.attr('data');
            if (data) {
                this.$('td.active').removeClass('active');
                $target.addClass('active');
                this.$('.alert-success').hide();
                var that = this;
                $.ajax({
                    url: this.url,
                    data: {
                        category: data
                    },
                    type: 'PUT',
                    success: function(response) {
                        that.$('.alert-success').show();
                        if (response.status_code == 0) {
                            $('.highlight.new .text').html(response.data.name);
                            app.article_content_view.highlight_view.change_level();
                        }
                    }
                })
            }
        },
        fill_category: function(categories) {
            var tr = $('<tr>');
            _.each(categories,
            function(element) {
                tr.append('<td data=' + element.id + '>' + element.name + '</td>');
            });
            while ($('td', tr).length < 2) tr.append('<td></td>');
            this.$el.find('tbody').append(tr);
        },
        toggle_line: function(e) {
            $(e.currentTarget).toggleClass('closed');
            app.article_content_view.highlight_view.toggle_underline($(e.currentTarget));
        }
    });
    var HomeRouter = Backbone.Router.extend({
        routes: {
            '': 'render_home',
            'article/:id/': 'render_article',
            'article/:id/:optional': 'render_article'
        },
        render_home: function() {
            if (ie && ie < 8) return;
            window.location.href = '/read/home/';
        },
        render_article: function(id) {
            var that = this;
            $('#quizzes').hide() $('.article-box').show();
            app.article_id = id;
            app.article = g_articles[id] || new Content({
                id: id
            });
            if (g_articles[id]) {
                app.article = articles[id];
                this.render_exact_article(app.article);
            } else {
                app.article = new Content({
                    id: id
                });
                app.article.fetch({
                    url: app.article.urlRoot + id + '/',
                    success: function(model, res) {
                        that.check_book(model, id);
                    }
                });
            }
        },
        check_book: function(model, id) {
            var that = this;
            if (app.article_content_view) app.article_content_view.remove();
            if (!app.level_view) {
                app.level_view = new LevelView({
                    icon_el: '.hover-cog'
                });
            }
            if (app.book_id) {
                this.render_exact_article(model);
            } else {
                $.get('/api/v1/read/article/' + id,
                function(res) {
                    var book_id = res.data.book_id;
                    if (book_id) {
                        $('#home').attr('href', '/read/books/');
                        app.book_id = book_id;
                        app.book = new Book({
                            id: book_id
                        });
                        app.book.fetch({
                            success: function() {
                                var book = app.book.toJSON();
                                $('#article-book-title').html(book.name_cn).attr('href', '/read/book/' + book_id + '/');
                                that.render_exact_article(model);
                                app.book_content = new BookContentView({
                                    model: app.book,
                                    icon_el: '.hover-list'
                                });
                                app.book_info = new BookInfoView({
                                    model: app.book,
                                    icon_el: '.hover-info'
                                });
                                if (!book.user_info.is_purchased) {
                                    app.book_buy = new BookBuyView({
                                        model: app.book,
                                        icon_el: '.hover-buy'
                                    });
                                }
                            }
                        });
                    } else {
                        $('#article-book-title').html(model.toJSON().data.title_cn);
                        $('.reader-nav #home').attr('href', '/read/news/');
                        that.render_exact_article(model);
                    }
                });
            }
        },
        render_exact_article: function(model) {
            if (model.get('data').intensity == 2) {
                app.article_content_view = new IntensiveView({
                    model: model
                });
            } else {
                app.article_content_view = new ExtensiveView({
                    model: model
                });
            }
        }
    });
    app.router = new HomeRouter();
    Backbone.history.start({
        pushState: true,
        root: '/read/'
    });
});