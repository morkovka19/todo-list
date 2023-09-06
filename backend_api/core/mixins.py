from django.db import models
from django.db.models.query import QuerySet
from core.constants import DA

class DefaultMixin(models.Model):

    class Meta:
        abstract = True



class DateMixin(DefaultMixin):
    created_at = models.DateTimeField(auto_now_add=True);
    update_at = models.DateTimeField(auto_now=True);

    class Meta:
        abstract = True



class NonDeletedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=0)


class IsDeletedMixin(DefaultMixin):
    deleted = models.PositiveSmallIntegerField(default=DA.DELETED_DEFAULT, verbose_name="Is Deleted")
    objects = NonDeletedManager()

    def fake_deleted(self, reason: int=1):
        self.deleted = reason

    class Meta:
        abstract = True