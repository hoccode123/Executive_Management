const Admin = require('./Admin')
const Html= require('./Html')

class Users extends Html {
    
    get_html_button_add() {
        return `<div class="row align-items-center m-l-0 m-b-10">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6 text-end">
                <a href="/admin/generaldirectory/users/add"  class="btn btn-success btn-sm btn-round has-ripple" ><i class="feather icon-plus"></i> Thêm mới</a>
            </div>
        </div>`;
    }
    get_html_search() {
        return `<div class="row">
            <div class="col-sm-12 col-md-6">
            <div class= id="report-table_length">
                <label class="d-inline-block">
                    Show 
                    <select name="report-table_length" aria-controls="report-table" class="custom-select custom-select-sm form-control form-control-sm">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="-1">All</option>
                    </select>
                    entries
                </label>
            </div>
            </div>
            <div class="col-sm-12 col-md-6 ">
            <div id="report-table_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" name="s" value=""placeholder="" aria-controls="report-table"></label></div>
            </div>
        </div>`;
    }
    get_html_pagination(){
        return `<div class="row m-t-15">
            <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="report-table_info" role="status" aria-live="polite">Showing 1 to 5 of 12 entries</div>
            </div>
            <div class="col-sm-12 col-md-7 ">
            <div class=" paging_simple_numbers text-right " id="report-table_paginate">
                <ul class="pagination justify-content-end">
                    <li class="page-item disabled"><a class="page-link" href="#!" tabindex="-1">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#!">1</a></li>
                    <li class="page-item"><a class="page-link" href="#!">2</a></li>
                    <li class="page-item"><a class="page-link" href="#!">3</a></li>
                    <li class="page-item"><a class="page-link" href="#!">Next</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>`;
    }
    get_html_table() {
        return `<div class="table-responsive">
            <table id="report-table" class="table mb-0 ">
                <thead class="thead-light">
                    <tr>
                        <th>Avatar</th>
                        <th>Họ tên</th>
                        <th>Tài khoản</th>
                        <th>Vai trò</th>
                        <th>Phòng ban</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">
                            <img src="/assets/images/user/img-avatar-1.jpg" alt="contact-img" title="contact-img" class="rounded me-3" height="48" />
                            <p class="m-0 d-inline-block align-middle font-16">
                                <a href="#!" class="text-body">Amazing Rolling Chair</a>
                                <br />
                                <span class="text-warning feather icon-star-on"></span>
                                <span class="text-warning feather icon-star-on"></span>
                                <span class="text-warning feather icon-star-on"></span>
                                <span class="text-warning feather icon-star-on"></span>
                                <span class="text-warning feather icon-star-on"></span>
                            </p>
                        </td>
                        <td class="align-middle">
                           qư
                        </td>
                        <td class="align-middle">
                           r
                        </td>
                        <td class="align-middle">
                            u
                        </td>
                        <td class="align-middle">
                           iokl
                        </td>
                        <td >
                            <div class="switch switch-success d-inline m-r-10">
                                <input type="checkbox" id="switch-p-1" checked="">
                                <label for="switch-p-1" class="cr "></label>
                            </div>
                        </td>
                        <td class="table-action">
                            <a href="#!" class="btn btn-icon btn-outline-primary"><i class="feather icon-edit"></i></a>
                            <a href="#!" class="btn btn-icon btn-outline-danger"><i class="feather icon-trash-2"></i></a>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>`;
    }
   
    get_html_main(array = []) {
        return `<div class="row" id="form">
            <!-- customar project  start -->
            <div class="col-xl-12">
                <div class="card ">
                    <div class="card-body dataTables_wrapper dt-bootstrap4 no-footer">`
                    + this.get_html_button_add()
                    
                    + this.get_html_table()
                    
                    + `</div>
                </div>
            </div>
            <!-- customar project  end -->
        </div>`;
    }
    get_html_form(array = []) {
        var str='';

        str += `<div class="row" id="formdetail">
        <!-- [ Form Validation ] start -->
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5>`+ this.change_module_to_name(this.get_module_child_name()) + `</h5>
                </div>
                <div class="card-body">
                    <form id="validation-form123" action="#!" novalidate="novalidate">
                        <div class="row">`; 

                        str += this.html_form(array) 

                    str += `<div class="col-md-12 text-right m-b-15">  
                                <button type="button" class="btn  btn-primary" onclick="add_user()">Cập nhật</button>
                                <a href="/admin/`+this.get_parent_module_name()+`/`+this.get_module_name()+`/index" class="btn  btn-secondary">Thoát</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- [ Form Validation ] end -->
        </div>`;
        
        return str;
    }
}

module.exports = Users