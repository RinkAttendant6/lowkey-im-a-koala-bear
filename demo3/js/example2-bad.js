/*global $*/
/**
 * @file Example 2 - Poorly encapsulated objects
 *       The code should be executable in Chrome 49+, Firefox 45+, and Edge 13+ without transpiling.
 * @author Vincent Diep
 */

'use strict';

let table;

class AbstractComponent {
    constructor(id) {
        this.domNode = document.getElementById(id);
    }
}

class TicketsTable extends AbstractComponent {
    initialize() {
        //Initialize DataTables
        this.dt = $(this.domNode).DataTable({retrieve: true});
    }
}

class AddTicketForm extends AbstractComponent {
    initialize() {
        // Initialize stuff
        $('.date').datepicker({
            autoclose: true,
            endDate: '0d',
            format: 'yyyy-mm-dd',
            todayBtn: 'linked',
            todayHighlight: true
        });
        
        // Events
        $(this.domNode).submit(e => this.submit(e));
    }
    
    submit(e) {
        e.preventDefault();

        $.ajax({
            method: this.domNode.method,
            url: this.domNode.action,
            data: $(this.domNode).serialize()
        }).done(data => {
            /***
             * Like example 1, by performing the table-related logic here, encapsulation is broken.
             * The form is tightly coupled with the table.
             * In addition, the form logic is "reaching through" the table object
             * to access the DataTables object inside, violating the Law of Demeter.
             */
            
            // Add row to DataTable
            table.dt.row.add([
                data.offender,
                data.date,
                data.violation
            ]).draw();
            
            // Reset the form
            this.domNode.reset();
        });
    }
}

table = new TicketsTable('ticket-history');
table.initialize();

let form = new AddTicketForm('insert-ticket-form');
form.initialize();