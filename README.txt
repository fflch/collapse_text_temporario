
collapse_text.module is an input filter to allow text to be
made into collapsible sections (like on editing forms).

Surround text with `[collapse]` and `[/collapse]` to make that
text be a collapsible section. You may open with `[collapse collapsed]`
instead to make it default closed.

The "legend" for the created fieldset may be set by putting a
title into the [collapse] tag as [collapse title=my title]. If you
wish to combine the options, you should do [collapse collapsed title=...].
If no title is specified, the title will be taken from the first
HTML header tag (<h1>, <h2>, <h3>, ...) found. It will then suppress
the first header tag that it found to avoid it showing up twice.
If there is no such tag found, the title will default to an
explanatory text title.

You may also put a "style" attribute into the collapse tag (it should
come before the "title" attribute, however.  This style is inserted as
a class into the fieldset, allowing sites to have different fieldsets
with different semantic meanings.

Note that in Drupal 7 the title and style options need to be surrounded
with quotes.

You may also override theme_collapse_text_fieldset() if you want to do
custom theming.

N.B. The HTML corrector filter is known to cause collapsible text to
not function properly.  If you use HTML corrector, make sure that you
arrange your filters such that collapse text is below (heavier than)
HTML corrector.  You can find this setting in admin/settings/filters.
