/**
 * Grid 分页条
 * <pre>
 *     使用范例：
 *     <bc-grid-page-bar v-ref:page-bar @reload="reloadMethod" @export="exportMethod"/>
 *     其中：
 *     <ul>
 *         <li>reload {Event} 分页参数变动、点击刷新按钮触发的事件。
 *              事件第 1 个参数为引发事件的原因（'pageNo' - 页码变动、'pageSize' - 页容量变动、'refresh' - 点击刷新按钮）,
 *              事件第 2 个参数为 pageNo 的值，
 *              事件第 3 个参数为 pageSize 的值
 *         </li>
 *         <li>export {Event} 点击导出按钮触发的事件。事件第 1 个参数为要导出的页码(pageNo)，-1 代表导出全部</li>
 *     </ul>
 * </pre>
 */
define(['bc', 'vue', 'text!bc/components/vue/grid-page-bar.html'], function (bc, Vue, template) {
	'use strict';
	// 注册为全局组件
	var id = 'bc-grid-page-bar';
	Vue.component(id, {
		template: template,
		props: {
			//pageNo: {type: Number, default: 0, twoWay: true},
			//pageSize: {type: Number, default: 25, twoWay: true},
			//totalCount: {type: Number, default: 0, twoWay: false}
		},
		data: function () {
			return {pageNo: 0, pageSize: 25, pageCount: 0, totalCount: 0}
		},
		created: function () {
			console.log("pageBar:created");
			this.pageCount = Math.ceil(this.totalCount / this.pageSize);
		},
		watch: {
			totalCount: function (val, oldVal) {
				console.log('pageBar.watch.totalCount: new=%s, old=%s', val, oldVal);
				this.pageCount = Math.ceil(val / this.pageSize);
			}
		},
		methods: {
			/** 首页、上一页、下一页、尾页 */
			toPage: function (pageNo) {
				if (pageNo == this.pageNo) return;
				console.log('pageBar.methods.toPage: new=%s, old=%s', pageNo, this.pageNo);
				this.pageNo = pageNo;
				this.$dispatch('reload', 'pageNo', this.pageNo, this.pageSize);
			},
			/** 改变 pageSize */
			changePageSize: function (pageSize) {
				if (pageSize == this.pageSize) return;
				console.log('pageBar.methods.changePageSize: new=%s, old=%s', pageSize, this.pageSize);
				this.pageSize = pageSize;
				this.$dispatch('reload', 'pageSize', this.pageNo, this.pageSize);
			},
			/** 导出 */
			export: function () {
				console.log("TODO: pageBar.methods.export. Decide export scope. Default export all.");
				this.$dispatch('export', -1);
			}
		}
	});

	return Vue.component(id);
});