/*global $*/
/**
 * @file Example 1 - Poorly encapsulated objects
 *       The code should be executable in Chrome 49+, Firefox 45+, and Edge 13+ without transpiling.
 * @author Vincent Diep
 */

'use strict';

class AbstractComponent {
    constructor(id) {
        this.domNode = document.getElementById(id);
    }
}

class TicketsTable extends AbstractComponent {
    initialize() {
        //Initialize DataTables
        $(this.domNode).DataTable({retrieve: true});
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
             * By performing the table-related logic here, encapsulation is broken.
             * The form is tightly coupled with the table.
             */

            // Add row to DataTable
            $('#ticket-history').DataTable().row.add([
                data.offender,
                data.date,
                data.violation
            ]).draw();

            // Reset the form
            this.domNode.reset();
        });
    }
}

let table = new TicketsTable('ticket-history');
table.initialize();

let form = new AddTicketForm('insert-ticket-form');
form.initialize();