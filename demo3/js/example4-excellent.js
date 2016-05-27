/*global $*/
/**
 * @file Example 4 - Custom events and fully-encapsulated object behaviour
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
        this.dt = $(this.domNode).DataTable();
    }
    
    addRow(data) {
        this.dt.row.add([
            data.offender,
            data.date,
            data.violation
        ]).draw();
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
            // Trigger custom event
            $(this.domNode).trigger('my-awesome-app:ticket-issued', [data]);
            
            // Reset the form
            this.domNode.reset();
        });
    }
}

let table = new TicketsTable('ticket-history');
table.initialize();

let form = new AddTicketForm('insert-ticket-form');
form.initialize();

// Handle event here
$(form.domNode).on('my-awesome-app:ticket-issued', (event, data) => {
    /***
     * Compared with example 3, the event handler logic acts on a
     * method of the table (i.e. only talks to immediate friends) and
     * avoids "reaching through" to the DataTables object (i.e. talking
     * to strangers).
     */
    
    table.addRow(data);
});