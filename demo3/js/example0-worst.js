/*global $*/
/**
 * @file Example 0 - No structure, no encapsulation
 *       The code should be executable in Chrome 45+, Firefox 22+, Edge, and Opera 32+ without transpiling.
 * @author Vincent Diep
 */

'use strict';

// Initialize DataTables
$('#ticket-history').DataTable({retrieve: true});

// Initialize Bootstrap datepicker
$('.date').datepicker({
    autoclose: true,
    endDate: '0d',
    format: 'yyyy-mm-dd',
    todayBtn: 'linked',
    todayHighlight: true
});

// What happens when the user submits the form to issue a new ticket
$('#insert-ticket-form').submit(e => {
    e.preventDefault();

    $.ajax({
        method: e.currentTarget.method,
        url: e.currentTarget.action,
        data: $(e.currentTarget).serialize()
    }).done(data => {
        // Add row to DataTable
        $('#ticket-history').DataTable().row.add([
            data.offender,
            data.date,
            data.violation
        ]).draw();
        
        // Reset the form
        e.currentTarget.reset();
    });
});