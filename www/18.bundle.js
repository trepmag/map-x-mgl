webpackJsonp([18],{91:function(a,t){a.exports=function(a){var t="",i=a,e=mx.helpers,d=(e.checkLanguage({obj:i,path:"data.title"}),e.checkLanguage({obj:i,path:"data.abstract"}));if(t+='<div class="float-left mx-view-item-desc-container"> ',e.path(i,"data.abstract."+d)&&(t+=' <p class="mx-view-item-desc" id="view_text_'+i.id+'">'+i.data.abstract[d]+"</p> "),t+="</div><div> ","vt"==i.type){t+=" ";var l=e.path(i,"data.style.rules");t+=" ",e.greaterThan(e.path(l,"length"),0)&&(t+=' <div class="mx-view-item-legend" id="check_view_legend_'+i.id+'"></div> '),t+=" "}t+=" ","rt"==i.type&&(t+=' <div class="mx-view-item-legend-raster" id="check_view_legend_'+i.id+'"></div> '),t+='</div><div> <div class="mx-controls-view"> <ul class="mx-controls-ul"> ',"sm"==i.type&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_start_story" data-lang_type="tooltip" data-view_action_key="btn_opt_start_story" data-view_action_target="'+i.id+'"> <div class="fa fa-play"></div> </li> ',i._edit&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_edit_story" data-lang_type="tooltip" data-view_action_key="btn_opt_edit_story" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-file-text"></div> </li> '),t+=" "),t+=" ",e.any(["gj"==i.type,"vt"==i.type])&&(t+=' <li class="mx-pointer hint--right" data-view_action_key="btn_opt_zoom_all" data-view_action_target="'+i.id+'" data-lang_key="btn_opt_zoom_all" data-lang_type="tooltip"> <div class="fa fa-search-minus"></div> </li> <li class="mx-pointer hint--right" data-lang_key="btn_opt_zoom_visible" data-lang_type="tooltip" data-view_action_key="btn_opt_zoom_visible" data-view_action_target="'+i.id+'"> <div class="fa fa-search-plus"></div> </li> <li class="mx-pointer hint--right" data-lang_key="btn_opt_reset" data-lang_type="tooltip" data-view_action_key="btn_opt_reset" data-view_action_target="'+i.id+'"> <div class="fa fa-undo"></div> </li> '),t+=" ",e.any(["gj"==i.type,"vt"==i.type,"rt"==i.type])&&(t+=' <li class="mx-pointer hint--right" data-view_action_key="btn_opt_search" data-view_action_target="mx-search-tool-'+i.id+'" data-lang_key="btn_opt_search" data-lang_type="tooltip"> <div class="fa fa-cog"></div> </li> '),t+=" ";var n=e.path(i,"data.source.urlMetadata");if(t+=" ",e.all(["rt"==i.type,n])&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_meta" data-lang_type="tooltip" data-view_action_key="btn_opt_meta_external" data-view_action_target="'+i.id+'" data-meta_link="'+n+'"> <div class="fa fa-info-circle"></div> </li> '),t+=" ","vt"==i.type&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_meta" data-lang_type="tooltip" data-view_action_key="btn_opt_meta" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-info-circle"></div> </li> <li class="mx-pointer hint--right" data-lang_key="btn_opt_download" data-lang_type="tooltip" data-view_action_key="btn_opt_download" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-cloud-download"></div> </li> '),t+=" ","gj"==i.type&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_upload" data-lang_type="tooltip" data-view_action_key="btn_upload_geojson" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-cloud-upload"></div> </li> <li class="mx-pointer hint--right" data-lang_key="btn_opt_delete_geojson" data-lang_type="tooltip" data-view_action_key="btn_opt_delete_geojson" data-view_action_target="'+i.id+'"> <div class="fa fa-trash-o"></div> </li> '),t+=" ",e.any(["vt"==i.type,"rt"==i.type])&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_screenshot" data-lang_type="tooltip" data-view_action_key="btn_opt_screenshot" data-view_action_target="'+i.id+'"> <div class="fa fa-camera"></div> </li> '),t+=" ",i._edit&&(t+=' <li class="mx-pointer hint--right" data-lang_key="btn_opt_edit_config" data-lang_type="tooltip" data-view_action_key="btn_opt_edit_config" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-pencil"></div> </li> ',e.all(["vt"==i.type,e.path(i,"data.attribute.name")])&&(t+=' <li class="mx-pointer hint--left" data-lang_key="btn_opt_edit_style" data-lang_type="tooltip" data-view_action_key="btn_opt_edit_style" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-paint-brush"></div> </li> <li class="mx-pointer hint--left" data-lang_key="btn_opt_edit_dashboard" data-lang_type="tooltip" data-view_action_key="btn_opt_edit_dashboard" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-pie-chart"></div> </li> '),t+=' <li class="mx-pointer hint--left" data-lang_key="btn_opt_delete" data-lang_type="tooltip" data-view_action_key="btn_opt_delete" data-view_action_handler="shiny" data-view_action_target="'+i.id+'"> <div class="fa fa-trash-o"></div> </li> '),t+=" ",e.any(["sm"==i.type,"vt"==i.type,"rt"==i.type])&&(t+=' <li class="mx-pointer hint--left" data-lang_key="btn_opt_share" data-lang_type="tooltip" data-view_action_key="btn_opt_share" data-view_action_target="'+i.id+'"> <div class="fa fa-external-link"></div> </li> '),t+=' </ul> </div></div><div id="mx-search-tool-'+i.id+'" class="mx-hide"> ',e.any(["vt"==i.type,"gj"==i.type])){t+=" ","string"==e.path(i,"data.attribute.type")&&(t+=' <select data-search_box_for="'+i.id+'" class="mx-search-box" multiple="TRUE"></select> '),t+=" ","number"==e.path(i,"data.attribute.type")&&(t+=' <div class="mx-slider-container"> <div class="mx-slider-header"> <div class="mx-slider-title" data-lang_key="btn_opt_numeric" data-lang_type="text"></div> <div class="mx-slider-dyn"> <div class="mx-slider-dyn-min"></div> <div class="mx-slider-dyn-max"></div> </div> </div> <div class="mx-slider mx-slider-numeric" data-range_numeric_for="'+i.id+'"></div> <div class="mx-slider-range"> <div class="mx-slider-range-min">'+e.path(i,"data.attribute.min",0)+'</div> <div class="mx-slider-range-max">'+e.path(i.data.attribute.max,0)+"</div> </div> </div> "),t+=" ";var s=e.path(i,"data.attribute.names");t+=" ";var _=e.path(i,"data.period.extent");t+=" ",e.all([s,_])&&(t+=" ",e.all([e.hasIndex(s,"mx_t0"),_.min,_.max])&&(t+=' <div class="mx-slider-container"> <div class="mx-slider-header"> <div class="mx-slider-title" data-lang_key="btn_opt_date" data-lang_type="text"></div> <div class="mx-slider-dyn"> <div class="mx-slider-dyn-min"></div> <div class="mx-slider-dyn-max"></div> </div> </div> <div class="mx-slider mx-slider-date" data-range_time_for="'+i.id+'"></div> <div class="mx-slider-range"> <div class="mx-slider-range-min">'+e.date(1e3*_.min)+'</div> <div class="mx-slider-range-max">'+e.date(1e3*_.max)+"</div> </div> </div> "),t+=" "),t+=" "}return t+=' <div class="mx-slider-container"> <div class="mx-slider-header"> <div class="mx-slider-title" data-lang_key="btn_opt_transparency" data-lang_type="text"></div> </div> <div class="mx-slider mx-slider-numeric" data-transparency_for="'+i.id+'"></div> <div class="mx-slider-range"> <div class="mx-slider-range-min">0%</div> <div class="mx-slider-range-max">100%</div> </div> </div></div>'}}});