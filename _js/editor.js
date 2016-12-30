$( document ).ready(function() {
	$(".pinned").pin();
});


function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}

var elem = document.getElementById("editor")
var editor = CodeMirror.fromTextArea(elem, {
	mode: "text/html",
	lineNumbers: true,
	lineWrapping: true,
	extraKeys: { Tab: betterTab },
	hintOptions: {
			schemaInfo: CodeMirror.htmlSchema
	}
});

function insertTags(betweenText, buttonID) {
	var startText = '';
	var endText = '';
	
	switch (buttonID) {
	case 'bold_btn':
		startText = 
'<strong>';
		endText = 
'</strong>';
		break;
	case 'italic_btn':
		startText = 
'<em>';
		endText = 
'</em>';	
		break;
	case 'underline_btn':
		startText = 
"<span class='underline'>";
		endText = 
"</span>";	
		break;
	case 'newmod_btn':
		startText = 
"<div class='module'>\n" + 
"  <div class='module-title'>\n" + 
"    <div class='label'>Module N<span class='colon'>:</span></div>\n" + 
"    <div class='title'>Title</div>\n" + 
"  </div>\n" + 
"  <ol>\n" + 
"    <li>";
		endText = 
"</li>\n" + 
"  </ol>\n" +
"</div>";
		break;
	case 'newstep_btn':
		editor.execCommand('newlineAndIndent');
		startText = 
"<li>";
		endText = 
"</li>";
		break;
	case 'br_btn':
		startText = 
"<br>";
		endText = 
"";
		break;
	case 'blockcode_btn':
		editor.execCommand('newlineAndIndent');
		startText = 
"<pre class='blocks'>";
		endText = 
"</pre>";
		break;
	case 'inlinecode_btn':
		startText = 
"<code class='b'>";
		endText = 
"</code>";
		break;
	case 'newpart_btn':
		startText = 
"<h1>Part : Title</h1>";
		endText = 
"";
		break;
	case 'lrq_btn':
		startText = 
"“";
		endText = 
"”";
		break;
  case 'link_btn':
		startText = 
"<a target='_blank' href=''>";
		endText = 
"</a>";
		break;
  case 'image_btn':
		startText = 
"<img class='' src=''>";
		endText = 
"";
		break;
	}
	
	return startText + betweenText + endText; 
}

$('.btn').click(function() {
	//alert($(this).attr('id'));
	betweenText = editor.getSelection();
	insertText = insertTags(betweenText, $(this).attr('id'));
	editor.replaceSelection(insertText, 'inside');
	editor.focus();
})

function updateOutput() {
	$('#output').html(editor.getValue());
	scratchblocks2.parse();
	scratchblocks2.parse("code.b", {inline: true});
}

editor.on('change',updateOutput);
//setInterval(, 100);

editor.setSize('100%', '200px');



var charWidth = editor.defaultCharWidth(), basePadding = 4;
editor.on("renderLine", function(cm, line, elt) {
  var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
  elt.style.textIndent = "-" + off + "px";
  elt.style.paddingLeft = (basePadding + off) + "px";
});
editor.refresh();
    



